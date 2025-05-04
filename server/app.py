from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
from models.extensions import db
from models.user import User
from models.incident_report import IncidentReport
from models.incident_image import IncidentImage
from models.incident_video import IncidentVideo
from routes.incident_routes import incidents
from config.cloudinary_config import configure_cloudinary
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configure CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:5173", os.getenv('FRONTEND_URL', '')],
            "methods": ["GET", "POST", "PUT", "DELETE"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })
    
    # Load configuration settings
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', os.getenv('SECRET_KEY'))
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
    
    # Configure database
    database_url = os.getenv('DATABASE_URL')
    # Handle Render PostgreSQL URL format
    if database_url and database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)
    api = Api(app)
    configure_cloudinary()

    # Register blueprints
    app.register_blueprint(incidents, url_prefix='/api')

    # Add routes
    class UserRegisterResource(Resource):
        def post(self):
            data = request.get_json()

            required_fields = ['username', 'email', 'password']
            for field in required_fields:
                if field not in data:
                    return {'message': f'{field} is required'}, 400

            if User.query.filter_by(username=data['username']).first():
                return {'message': 'Username already exists'}, 400
            if User.query.filter_by(email=data['email']).first():
                return {'message': 'Email already exists'}, 400

            new_user = User(
                username=data['username'],
                email=data['email'],
                password_hash=generate_password_hash(data['password'])
            )

            try:
                db.session.add(new_user)
                db.session.commit()
                access_token = create_access_token(identity=new_user.id)
                return {
                    'message': 'User created successfully',
                    'access_token': access_token
                }, 201
            except Exception as e:
                db.session.rollback()
                return {'message': f'Error creating user: {str(e)}'}, 500

    class UserLoginResource(Resource):
        def post(self):
            data = request.get_json()

            if not data.get('email') or not data.get('password'):
                return {'message': 'Email and password are required'}, 400

            user = User.query.filter_by(email=data['email']).first()

            if user and check_password_hash(user.password_hash, data['password']):
                access_token = create_access_token(identity=user.id)
                return {
                    'message': 'Login successful',
                    'access_token': access_token,
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email,
                        'is_admin': user.is_admin
                    }
                }, 200

            return {'message': 'Invalid email or password'}, 401

    # API Routes
    api.add_resource(UserRegisterResource, '/api/register')
    api.add_resource(UserLoginResource, '/api/login')

    return app

app = create_app()

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)