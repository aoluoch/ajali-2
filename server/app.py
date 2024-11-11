from flask import Flask, request, jsonify, session, make_response
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
app.secret_key = 'your_secret_key'

# Initialize db, migrations, and API
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

# ------------------------- User Resources -------------------------
class UserRegisterResource(Resource):
    def post(self):
        data = request.get_json()
        if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Username or Email already exists'}), 400
        
        is_admin = data.get('is_admin', 'false').lower() == 'true'

        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            is_admin=is_admin
        )
        db.session.add(new_user)
        db.session.commit()
        return make_response("User posted", 201)

class UserLoginResource(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()

        if user and check_password_hash(user.password_hash, data['password']):
            session['user_id'] = user.id
            session['is_admin'] = user.is_admin
            return make_response({"message": "Login successful"},  201)
        return make_response({"message": "Invalid username or password"}, 401)

class UserLogoutResource(Resource):
    def post(self):
        session.pop('user_id', None)
        session.pop('is_admin', None)
        return make_response({"message": "Logged out successfully"}, 200)

# ------------------------- Incident Resources -------------------------
class IncidentListResource(Resource):
    def get(self):
        incidents = IncidentReport.query.all()
        return jsonify([incident.to_dict() for incident in incidents])

    def post(self):
        data = request.get_json()

        # Check if required fields are present in the request
        if not data:
            return jsonify({"message": "Request body must be in JSON format"}), 400

        required_fields = ['description', 'latitude', 'longitude']
        
        for field in required_fields:
            if field not in data:
                return jsonify({"message": f"'{field}' is required"}), 400

        description = data['description']
        latitude = data['latitude']
        longitude = data['longitude']
        
        # Optional 'status' field, with a default value of 'under investigation'
        status = data.get('status', 'under investigation')

        # Retrieve user_id from session (ensure user is logged in)
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({"message": "User not logged in. Please login to report an incident."}), 401

        # Create a new incident report
        new_incident = IncidentReport(
            description=description,
            status=status,
            latitude=latitude,
            longitude=longitude,
            user_id=user_id
        )

        # Add to database and commit the changes
        db.session.add(new_incident)
        db.session.commit()

        # Return the newly created incident in response
        return jsonify(new_incident.to_dict()), 201
    
    def delete(self):
        if not session.get('is_admin'):
            return jsonify({'message': 'Admin access required'}), 403
        IncidentReport.query.delete()
        db.session.commit()
        return jsonify({'message': 'All incident reports deleted'}), 204

class IncidentResource(Resource):
    def get(self, id):
        incident = IncidentReport.query.get_or_404(id)
        return jsonify(incident.to_dict())

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

    def delete(self, id):
        incident = IncidentReport.query.get_or_404(id)
        if incident.user_id != session.get('user_id') and not session.get('is_admin'):
            return jsonify({'message': 'Permission denied'}), 403
        db.session.delete(incident)
        db.session.commit()
        return jsonify({'message': 'Incident report deleted'}), 204

# ------------------------- Incident Image & Video Resources -------------------------
class IncidentImageResource(Resource):
    def post(self, incident_id):
        data = request.get_json()
        new_image = IncidentImage(report_id=incident_id, image_url=data['image_url'])
        db.session.add(new_image)
        db.session.commit()
        return jsonify(new_image.to_dict()), 201

    def get(self, incident_id):
        incident = IncidentReport.query.get_or_404(incident_id)
        return jsonify([image.to_dict() for image in incident.images])

class IncidentImageSingleResource(Resource):
    def delete(self, incident_id, image_id):
        image = IncidentImage.query.filter_by(report_id=incident_id, id=image_id).first_or_404()
        if image.report.user_id != session.get('user_id') and not session.get('is_admin'):
            return jsonify({'message': 'Permission denied'}), 403
        db.session.delete(image)
        db.session.commit()
        return jsonify({'message': 'Incident image deleted'}), 204

class IncidentVideoResource(Resource):
    def post(self, incident_id):
        data = request.get_json()
        new_video = IncidentVideo(report_id=incident_id, video_url=data['video_url'])
        db.session.add(new_video)
        db.session.commit()
        return jsonify(new_video.to_dict()), 201

    def get(self, incident_id):
        incident = IncidentReport.query.get_or_404(incident_id)
        return jsonify([video.to_dict() for video in incident.videos])

class IncidentVideoSingleResource(Resource):
    def delete(self, incident_id, video_id):
        video = IncidentVideo.query.filter_by(report_id=incident_id, id=video_id).first_or_404()
        if video.report.user_id != session.get('user_id') and not session.get('is_admin'):
            return jsonify({'message': 'Permission denied'}), 403
        db.session.delete(video)
        db.session.commit()
        return jsonify({'message': 'Incident video deleted'}), 204

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