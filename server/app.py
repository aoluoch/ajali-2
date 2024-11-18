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
from functools import wraps
from datetime import timedelta

# Create Flask app and API
app = Flask(__name__)
CORS(app, supports_credentials=True, origins="http://localhost:5173")
api = Api(app)

# Load configuration settings
app.config['SECRET_KEY'] = 'ajali-2' 
app.config['TESTING'] = True  # Set to True when running tests, False for production
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ajali.db'
app.config['SESSION_PERMANENT'] = True  # Session persists across browser restarts
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)  # Session lasts 1 day

# Initialize the database
db.init_app(app)
migrate = Migrate(app, db)


# ---------------- Session Helper Functions ----------------
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if app.config.get('TESTING'):
            return f(*args, **kwargs)  # Bypass session validation for testing mode

        # Check if the user is logged in
        if 'user_id' not in session:
            return {'message': 'User not logged in'}, 401

        return f(*args, **kwargs)
    return decorated

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            return {'name': user.name, 'id': user.id, 'email': user.email}, 200
        return {}, 401

api.add_resource(CheckSession, '/check_session')

class UserRegisterResource(Resource):
    def post(self):
        data = request.get_json()

        # Validate required fields
        required_fields = ['username', 'email', 'password']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required'}, 400

        # Check if user already exists
        if User.query.filter_by(username=data['username']).first():
            return {'message': 'Username already exists'}, 400
        if User.query.filter_by(email=data['email']).first():
            return {'message': 'Email already exists'}, 400

        # Create new user
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=generate_password_hash(data['password'])
        )

        try:
            db.session.add(new_user)
            db.session.commit()
            return {'message': 'User created successfully'}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': f'Error creating user: {str(e)}'}, 500

class UserLoginResource(Resource):
    def post(self):
        data = request.get_json()

        # Validate required fields
        if not data.get('username') or not data.get('password'):
            return {'message': 'Username and password are required'}, 400

        user = User.query.filter_by(username=data['username']).first()

        if user and check_password_hash(user.password_hash, data['password']):
            # Set session
            session['user_id'] = user.id
            session.permanent = True  # Session lasts as per PERMANENT_SESSION_LIFETIME

            return {
                'message': 'Login successful',
                'user': user.to_dict()
            }, 200

        return {'message': 'Invalid username or password'}, 401

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
        data = request.get_json()

        # Validate required fields
        required_fields = ['description', 'latitude', 'longitude']
        for field in required_fields:
            if field not in data:
                return {'message': f'{field} is required'}, 400

        # Create new incident
        new_incident = IncidentReport(
            description=data['description'],
            status=data.get('status', 'under investigation'),
            latitude=data['latitude'],
            longitude=data['longitude'],
            user_id=session.get('user_id')  # Use user_id from session
        )

        try:
            db.session.add(new_incident)
            db.session.commit()
            return {'message': 'Incident created successfully'}, 201
        except Exception as e:
            db.session.rollback()
            return {'message': f'Error creating incident: {str(e)}'}, 500

class IncidentResource(Resource):
    @login_required
    def get(self, id):
        incident = IncidentReport.query.get_or_404(id)
        return jsonify(incident.to_dict())

    @login_required
    def put(self, id):
        incident = IncidentReport.query.get_or_404(id)

        if incident.user_id != session.get('user_id'):
            return jsonify({'message': 'Permission denied'}), 403

        data = request.get_json()
        incident.description = data.get('description', incident.description)
        incident.status = data.get('status', incident.status) if session.get('is_admin') else incident.status
        incident.latitude = data.get('latitude', incident.latitude)
        incident.longitude = data.get('longitude', incident.longitude)

        db.session.commit()
        return jsonify(incident.to_dict())

    @login_required
    def delete(self, id):
        incident = IncidentReport.query.get_or_404(id)

        if incident.user_id != session.get('user_id') and not session.get('is_admin'):
            return make_response({"message": "Permission denied"}, 403)

        # Delete associated images and videos
        incident_images = IncidentImage.query.filter_by(report_id=incident.id).all()
        for image in incident_images:
            db.session.delete(image)

        incident_videos = IncidentVideo.query.filter_by(report_id=incident.id).all()
        for video in incident_videos:
            db.session.delete(video)

        db.session.delete(incident)

        try:
            db.session.commit()
            return make_response({"message": "Incident report and associated media deleted"}, 204)
        except Exception as e:
            db.session.rollback()
            return make_response({"message": f"An error occurred: {str(e)}"}, 500)

# ------------------------- Incident Image & Video Resources -------------------------
class IncidentImageResource(Resource):
    @login_required
    def post(self, incident_id):
        data = request.get_json()
        new_image = IncidentImage(report_id=incident_id, image_url=data['image_url'])
        db.session.add(new_image)
        db.session.commit()
        return make_response({"message": "Image posted"}, 201)

    @login_required
    def get(self, incident_id):
        incident = IncidentReport.query.get_or_404(incident_id)
        return jsonify([image.to_dict() for image in incident.images])

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

class IncidentVideoResource(Resource):
    @login_required
    def post(self, incident_id):
        data = request.get_json()
        new_video = IncidentVideo(report_id=incident_id, video_url=data['video_url'])
        db.session.add(new_video)
        db.session.commit()
        return make_response({"message": "Incident video posted"}, 201)

    @login_required
    def get(self, incident_id):
        incident = IncidentReport.query.get_or_404(incident_id)
        return jsonify([video.to_dict() for video in incident.videos])

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
api.add_resource(IncidentResource, '/incidents/<int:id>')
api.add_resource(IncidentImageResource, '/incidents/<int:incident_id>/images')
api.add_resource(IncidentImageSingleResource, '/incidents/<int:incident_id>/images/<int:image_id>')
api.add_resource(IncidentVideoResource, '/incidents/<int:incident_id>/videos')
api.add_resource(IncidentVideoSingleResource, '/incidents/<int:incident_id>/videos/<int:video_id>')

if __name__ == '__main__':
    app.run(debug=True, port=5000)