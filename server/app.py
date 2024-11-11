from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models.extensions import db
from models.user import User
from models.incident_report import IncidentReport
from models.incident_image import IncidentImage
from models.incident_video import IncidentVideo
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize Flask app and extensions
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ajali.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize db, migrations, and API
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

# ------------------------- User Resources -------------------------
class UserResource(Resource):
    def post(self):
        """Register a new user"""
        data = request.get_json()
        if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Username or Email already exists'}), 400

        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            is_admin=data.get('is_admin', False)
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201

    def get(self):
        """Get current user profile"""
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({'message': 'Not logged in'}), 401
        user = User.query.get_or_404(user_id)
        return jsonify(user.to_dict())

class AuthResource(Resource):
    def post(self):
        """Login user"""
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()

        if user and check_password_hash(user.password_hash, data['password']):
            session['user_id'] = user.id
            session['is_admin'] = user.is_admin
            return jsonify({'message': 'Login successful', 'user': user.to_dict()}), 200
        return jsonify({'message': 'Invalid username or password'}), 401

    def delete(self):
        """Logout user"""
        session.pop('user_id', None)
        session.pop('is_admin', None)
        return jsonify({'message': 'Logged out successfully'}), 200

# ------------------------- Incident Resources -------------------------
class IncidentListResource(Resource):
    def get(self):
        """Get all incidents"""
        incidents = IncidentReport.query.all()
        return jsonify([incident.to_dict() for incident in incidents])

    def post(self):
        """Create new incident"""
        if not session.get('user_id'):
            return jsonify({'message': 'Login required'}), 401
            
        data = request.get_json()
        new_incident = IncidentReport(
            description=data['description'],
            status=data.get('status', 'under investigation'),
            latitude=data['latitude'],
            longitude=data['longitude'],
            user_id=session.get('user_id')
        )
        db.session.add(new_incident)
        db.session.commit()
        return jsonify(new_incident.to_dict()), 201

    def delete(self):
        """Delete all incidents (admin only)"""
        if not session.get('is_admin'):
            return jsonify({'message': 'Admin access required'}), 403
        IncidentReport.query.delete()
        db.session.commit()
        return jsonify({'message': 'All incident reports deleted'}), 204

class IncidentResource(Resource):
    def get(self, id):
        """Get specific incident"""
        incident = IncidentReport.query.get_or_404(id)
        return jsonify(incident.to_dict())

    def put(self, id):
        """Update specific incident"""
        if not session.get('user_id'):
            return jsonify({'message': 'Login required'}), 401
            
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

    def delete(self, id):
        """Delete specific incident"""
        if not session.get('user_id'):
            return jsonify({'message': 'Login required'}), 401
            
        incident = IncidentReport.query.get_or_404(id)
        if incident.user_id != session.get('user_id') and not session.get('is_admin'):
            return jsonify({'message': 'Permission denied'}), 403
        db.session.delete(incident)
        db.session.commit()
        return jsonify({'message': 'Incident report deleted'}), 204

# ------------------------- Incident Media Resources -------------------------
class IncidentImageResource(Resource):
    def get(self, incident_id):
        """Get all images for an incident"""
        incident = IncidentReport.query.get_or_404(incident_id)
        return jsonify([image.to_dict() for image in incident.images])

    def post(self, incident_id):
        """Add new image to incident"""
        if not session.get('user_id'):
            return jsonify({'message': 'Login required'}), 401
            
        data = request.get_json()
        new_image = IncidentImage(report_id=incident_id, image_url=data['image_url'])
        db.session.add(new_image)
        db.session.commit()
        return jsonify(new_image.to_dict()), 201

class IncidentImageDetailResource(Resource):
    def delete(self, incident_id, image_id):
        """Delete specific image from incident"""
        if not session.get('user_id'):
            return jsonify({'message': 'Login required'}), 401
            
        image = IncidentImage.query.filter_by(report_id=incident_id, id=image_id).first_or_404()
        if image.report.user_id != session.get('user_id') and not session.get('is_admin'):
            return jsonify({'message': 'Permission denied'}), 403
        db.session.delete(image)
        db.session.commit()
        return jsonify({'message': 'Incident image deleted'}), 204

class IncidentVideoResource(Resource):
    def get(self, incident_id):
        """Get all videos for an incident"""
        incident = IncidentReport.query.get_or_404(incident_id)
        return jsonify([video.to_dict() for video in incident.videos])

    def post(self, incident_id):
        """Add new video to incident"""
        if not session.get('user_id'):
            return jsonify({'message': 'Login required'}), 401
            
        data = request.get_json()
        new_video = IncidentVideo(report_id=incident_id, video_url=data['video_url'])
        db.session.add(new_video)
        db.session.commit()
        return jsonify(new_video.to_dict()), 201

class IncidentVideoDetailResource(Resource):
    def delete(self, incident_id, video_id):
        """Delete specific video from incident"""
        if not session.get('user_id'):
            return jsonify({'message': 'Login required'}), 401
            
        video = IncidentVideo.query.filter_by(report_id=incident_id, id=video_id).first_or_404()
        if video.report.user_id != session.get('user_id') and not session.get('is_admin'):
            return jsonify({'message': 'Permission denied'}), 403
        db.session.delete(video)
        db.session.commit()
        return jsonify({'message': 'Incident video deleted'}), 204

# ------------------------- API Routes Setup -------------------------
# User routes
api.add_resource(UserResource, '/api/users')
api.add_resource(AuthResource, '/api/auth')

# Incident routes
api.add_resource(IncidentListResource, '/api/incidents')
api.add_resource(IncidentResource, '/api/incidents/<int:id>')

# Incident media routes
api.add_resource(IncidentImageResource, '/api/incidents/<int:incident_id>/images')
api.add_resource(IncidentImageDetailResource, '/api/incidents/<int:incident_id>/images/<int:image_id>')
api.add_resource(IncidentVideoResource, '/api/incidents/<int:incident_id>/videos')
api.add_resource(IncidentVideoDetailResource, '/api/incidents/<int:incident_id>/videos/<int:video_id>')

# Error Handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({'message': 'Not found'}), 404

@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({'message': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)