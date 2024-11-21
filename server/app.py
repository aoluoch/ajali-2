from flask import Flask, request, jsonify, session, make_response
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from models.extensions import db
from models.user import User
from models.incident_report import IncidentReport
from models.incident_image import IncidentImage
from models.incident_video import IncidentVideo
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from functools import wraps
from datetime import timedelta
import cloudinary
import cloudinary.uploader
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)

# Create Flask app and API
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=("http://localhost:5173"))
api = Api(app)

# Load configuration settings
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default_secret_key')
app.config['TESTING'] = False  # Set to True when running tests, False for production
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///ajali.db')
app.config['SESSION_PERMANENT'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)

# Cloudinary setup
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

# Initialize the database
db.init_app(app)
migrate = Migrate(app, db)

# ---------------- Session Helper Functions ----------------
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            return {'message': 'User  not logged in'}, 401
        return f(*args, **kwargs)
    return decorated

# ---------------- User Resources ----------------
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            return {'name': user.username, 'id': user.id, 'email': user.email}, 200
        return {}, 401

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
            return {'message': 'User  created successfully'}, 201
        except Exception as e:
            db.session.rollback()
            logging.error(f"Error creating user: {str(e)}")
            return {'message': f'Error creating user: {str(e)}'}, 500

class UserLoginResource(Resource):
    def post(self):
        data = request.get_json()
        if not data.get('email') or not data.get('password'):
            return {'message': 'Email and password are required'}, 400

        user = User.query.filter_by(email=data['email']).first()
        if user and check_password_hash(user.password_hash, data['password']):
            session['user_id'] = user.id
            session.permanent = True
            return {
                'message': 'Login successful',
                'user': user.to_dict()
            }, 200

        return {'message': 'Invalid email or password'}, 401

class UserLogoutResource(Resource):
    def post(self):
        session.clear()
        return {'message': 'Logged out successfully'}, 200

# ---------------- Incident Resources ----------------
class IncidentListResource(Resource):
    @login_required
    def get(self):
        incidents = IncidentReport.query.all()
        return jsonify([incident.to_dict() for incident in incidents])

    @login_required
    def post(self):
        logging.info("Full form data received: %s", request.form)

        description = request.form.get('description')
        incident_type = request.form.get('incidentType')
        latitude = request.form.get('latitude')
        longitude = request.form.get('longitude')
        files = request.files.getlist('media')

        required_fields = ['description', 'incidentType', 'latitude', 'longitude']
        for field in required_fields:
            if field not in request.form or not request.form[field]:
                               return {'message': f'{field} is required'}, 400

        try:
            latitude = float(latitude)
            longitude = float(longitude)
        except ValueError:
            return {'message': 'Latitude and Longitude must be valid numbers.'}, 400

        new_incident = IncidentReport(
            description=description,
            incident_type=incident_type,
            latitude=latitude,
            longitude=longitude,
            user_id=session.get('user_id'),
        )

        # Handle media uploads
        media_urls = []
        for file in files:
            filename = secure_filename(file.filename)
            upload_result = cloudinary.uploader.upload(file)
            media_url = upload_result.get('secure_url')
            media_urls.append(media_url)

            if media_url.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                db.session.add(IncidentImage(report_id=new_incident.id, image_url=media_url))
            elif media_url.lower().endswith(('.mp4', '.mov', '.avi')):
                db.session.add(IncidentVideo(report_id=new_incident.id, video_url=media_url))

        try:
            db.session.add(new_incident)
            db.session.commit()
            return {'message': 'Incident created successfully', 'media': media_urls}, 201
        except Exception as e:
            db.session.rollback()
            logging.error(f"Error processing incident: {str(e)}")
            return {'message': f'Error creating incident: {str(e)}'}, 500

# ---------------- Incident Media Resources ----------------
class IncidentImageSingleResource(Resource):
    @login_required
    def delete(self, incident_id, image_id):
        image = IncidentImage.query.filter_by(report_id=incident_id, id=image_id).first_or_404()
        report = IncidentReport.query.get(image.report_id)

        if report.user_id != session.get('user_id') and not session.get('is_admin'):
            return make_response({"message": "Permission denied"}, 403)

        db.session.delete(image)
        db.session.commit()
        return make_response({"message": "Incident image deleted"}, 204)

class IncidentVideoSingleResource(Resource):
    @login_required
    def delete(self, incident_id, video_id):
        video = IncidentVideo.query.filter_by(report_id=incident_id, id=video_id).first_or_404()
        report = IncidentReport.query.get(video.report_id)

        if report.user_id != session.get('user_id') and not session.get('is_admin'):
            return make_response({"message": "Permission denied"}, 403)

        db.session.delete(video)
        db.session.commit()
        return make_response({"message": "Incident video deleted"}, 204)

# ------------------------- API Routes Setup -------------------------
api.add_resource(UserRegisterResource, '/users')
api.add_resource(UserLoginResource, '/login')
api.add_resource(UserLogoutResource, '/logout')
api.add_resource(IncidentListResource, '/incidents')
api.add_resource(IncidentImageSingleResource, '/incidents/<int:incident_id>/images/<int:image_id>')
api.add_resource(IncidentVideoSingleResource, '/incidents/<int:incident_id>/videos/<int:video_id>')

if __name__ == '__main__':
    app.run(debug=True, port=5000)