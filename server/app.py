from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy

# Import db from server/models/app.py
from server.models.app import db  

# Import models from the app/models directory
from server .models.app import User, IncidentReport, IncidentImage, IncidentVideo

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS (optional, can be disabled if not needed globally)
CORS(app)

# Configure the database URI (SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/yourdatabase.db'  # Database file path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # To avoid overhead

# Initialize the SQLAlchemy instance with the app

db = SQLAlchemy(app)

# Initialize Flask-Migrate for database migrations
migrate = Migrate(app, db)

# Initialize Flask-RESTful API
api = Api(app)

# ------------------------- User Resource -------------------------
class UserResource(Resource):
    def get(self, id=None):
        """
        Get a user by ID, or all users if no ID is provided.
        """
        if id:
            user = User.query.get_or_404(id)  # Get user by ID, or 404 if not found
            return jsonify(user.to_dict())  # Return the user as JSON
        else:
            users = User.query.all()  # Get all users
            return jsonify([user.to_dict() for user in users])  # Return list of users as JSON

    def post(self):
        """
        Create a new user
        """
        data = request.get_json()  # Get data from the request
        try:
            # Ensure uniqueness of username/email by checking the database first
            if User.query.filter_by(username=data['username']).first():
                return jsonify({'message': 'Username already exists'}), 400
            if User.query.filter_by(email=data['email']).first():
                return jsonify({'message': 'Email already exists'}), 400

            # Create a new User object
            new_user = User(
                username=data['username'],
                email=data['email'],
                password_hash=data['password_hash'],  # Assume you're hashing the password elsewhere
                is_admin=data.get('is_admin', False)  # Default to False if not provided
            )

            db.session.add(new_user)  # Add user to the session
            db.session.commit()  # Commit to save in the database
            return jsonify(new_user.to_dict()), 201  # Return the newly created user

        except Exception as e:
            db.session.rollback()  # Rollback if there’s an error
            return jsonify({'message': f'Error creating user. {str(e)}'}), 400

    def put(self, id):
        """
        Update an existing user by ID
        """
        user = User.query.get_or_404(id)  # Get user by ID, or 404 if not found
        data = request.get_json()  # Get data from the request

        # Update the fields (only update the fields provided)
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.password_hash = data.get('password_hash', user.password_hash)
        user.is_admin = data.get('is_admin', user.is_admin)

        db.session.commit()  # Commit changes to the database
        return jsonify(user.to_dict())  # Return the updated user

    def delete(self, id):
        """
        Delete a user by ID
        """
        user = User.query.get_or_404(id)  # Get user by ID, or 404 if not found
        db.session.delete(user)  # Delete the user
        db.session.commit()  # Commit the deletion
        return jsonify({'message': 'User deleted'}), 204  # Return a success message


# ------------------------- Incident Resources -------------------------
class IncidentListResource(Resource):
    def get(self):
        """
        Get a list of all incident reports
        """
        incidents = IncidentReport.query.all()
        return jsonify([incident.to_dict() for incident in incidents])

    def post(self):
        """
        Create a new incident report
        """
        data = request.get_json()  # Get data from the request
        try:
            new_incident = IncidentReport(
                description=data['description'],
                status=data.get('status', 'under investigation'),  # Default status
                latitude=data['latitude'],
                longitude=data['longitude'],
                user_id=data['user_id']
            )
            db.session.add(new_incident)
            db.session.commit()
            return jsonify(new_incident.to_dict()), 201  # Return the created incident

        except Exception as e:
            db.session.rollback()  # Rollback if there’s an error
            return jsonify({'message': f'Error creating incident. {str(e)}'}), 400


class IncidentResource(Resource):
    def get(self, id):
        """
        Get a specific incident by ID
        """
        incident = IncidentReport.query.get_or_404(id)
        return jsonify(incident.to_dict())

    def put(self, id):
        """
        Update an existing incident by ID
        """
        data = request.get_json()  # Get data from the request
        incident = IncidentReport.query.get_or_404(id)

        # Update incident fields
        incident.description = data.get('description', incident.description)
        incident.status = data.get('status', incident.status)
        incident.latitude = data.get('latitude', incident.latitude)
        incident.longitude = data.get('longitude', incident.longitude)

        db.session.commit()  # Commit changes to the database
        return jsonify(incident.to_dict())

    def delete(self, id):
        """
        Delete a specific incident by ID
        """
        incident = IncidentReport.query.get_or_404(id)
        db.session.delete(incident)
        db.session.commit()
        return jsonify({'message': 'Incident report deleted'}), 204


# ------------------------- Incident Image Resources -------------------------
class IncidentImageResource(Resource):
    def post(self, incident_id):
        """
        Add an image to an incident report
        """
        data = request.get_json()
        new_image = IncidentImage(
            report_id=incident_id,
            image_url=data['image_url']
        )
        db.session.add(new_image)
        db.session.commit()
        return jsonify(new_image.to_dict()), 201

    def get(self, incident_id):
        """
        Get all images for a specific incident
        """
        incident = IncidentReport.query.get_or_404(incident_id)
        return jsonify([image.to_dict() for image in incident.images])


# ------------------------- Incident Video Resources -------------------------
class IncidentVideoResource(Resource):
    def post(self, incident_id):
        """
        Add a video to an incident report
        """
        data = request.get_json()
        new_video = IncidentVideo(
            report_id=incident_id,
            video_url=data['video_url']
        )
        db.session.add(new_video)
        db.session.commit()
        return jsonify(new_video.to_dict()), 201

    def get(self, incident_id):
        """
        Get all videos for a specific incident
        """
        incident = IncidentReport.query.get_or_404(incident_id)
        return jsonify([video.to_dict() for video in incident.videos])


# ------------------------- API Routes Setup -------------------------
# Add the resources to the API
api.add_resource(UserResource, '/api/users', '/api/users/<int:id>')  # User endpoints
api.add_resource(IncidentListResource, '/api/incidents')  # Incident list and create
api.add_resource(IncidentResource, '/api/incidents/<int:id>')  # Incident read, update, delete
api.add_resource(IncidentImageResource, '/api/incidents/<int:incident_id>/images')  # Incident image upload
api.add_resource(IncidentVideoResource, '/api/incidents/<int:incident_id>/videos')  # Incident video upload


# ------------------------- Run the Application -------------------------
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Change port if needed
