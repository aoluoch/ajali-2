from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from extensions import db
from models import User, IncidentReport, IncidentImage, IncidentVideo

# Initialize Flask app and extensions
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ajali.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize db once
db.init_app(app)

# Migrate and API setup
migrate = Migrate(app, db)
api = Api(app)

# Create the database if not already created
with app.app_context():
    db.create_all()  # Creates tables in the database


# ------------------------- User Resource -------------------------
class UserResource(Resource):
    def get(self, id=None):
        if id:
            user = User.query.get_or_404(id)
            return jsonify(user.to_dict())
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])

    def post(self):
        data = request.get_json()
        if User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Username or Email already exists'}), 400

        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=data['password_hash'],
            is_admin=data.get('is_admin', False)
        )

        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201

    def put(self, id):
        user = User.query.get_or_404(id)
        data = request.get_json()
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.password_hash = data.get('password_hash', user.password_hash)
        user.is_admin = data.get('is_admin', user.is_admin)

        db.session.commit()
        return jsonify(user.to_dict())

    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted'}), 204


# ------------------------- Incident Resources -------------------------
class IncidentListResource(Resource):
    def get(self):
        incidents = IncidentReport.query.all()
        return jsonify([incident.to_dict() for incident in incidents])

    def post(self):
        data = request.get_json()
        new_incident = IncidentReport(
            description=data['description'],
            status=data.get('status', 'under investigation'),
            latitude=data['latitude'],
            longitude=data['longitude'],
            user_id=data['user_id']
        )
        db.session.add(new_incident)
        db.session.commit()
        return jsonify(new_incident.to_dict()), 201


class IncidentResource(Resource):
    def get(self, id):
        incident = IncidentReport.query.get_or_404(id)
        return jsonify(incident.to_dict())

    def put(self, id):
        data = request.get_json()
        incident = IncidentReport.query.get_or_404(id)
        incident.description = data.get('description', incident.description)
        incident.status = data.get('status', incident.status)
        incident.latitude = data.get('latitude', incident.latitude)
        incident.longitude = data.get('longitude', incident.longitude)

        db.session.commit()
        return jsonify(incident.to_dict())

    def delete(self, id):
        incident = IncidentReport.query.get_or_404(id)
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


# ------------------------- API Routes Setup -------------------------
api.add_resource(UserResource, '/api/users', '/api/users/<int:id>')
api.add_resource(IncidentListResource, '/api/incidents')
api.add_resource(IncidentResource, '/api/incidents/<int:id>')
api.add_resource(IncidentImageResource, '/api/incidents/<int:incident_id>/images')
api.add_resource(IncidentVideoResource, '/api/incidents/<int:incident_id>/videos')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
