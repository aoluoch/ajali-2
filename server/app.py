from flask import Flask, request, session, jsonify
from flask_restful import Api, Resource
from flask_session import Session
from flask_bcrypt import Bcrypt
from models import db, User, IncidentReport
import datetime

app = Flask(__name__)
api = Api(app)
bcrypt = Bcrypt(app)

# Configure session
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

# Create tables if not already created
with app.app_context():
    db.create_all()

# Helper functions
def authenticate_user(func):
    """Decorator to ensure a user is authenticated."""
    def wrapper(*args, **kwargs):
        if not session.get("user_id"):
            return {"message": "Unauthorized. Please log in."}, 401
        return func(*args, **kwargs)
    return wrapper

# Resources
class UserResource(Resource):
    def post(self):
        """Register a new user."""
        data = request.json
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return {"message": "All fields are required."}, 400

        if User.query.filter((User.username == username) | (User.email == email)).first():
            return {"message": "Username or email already exists."}, 400

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
        user = User(username=username, email=email, password_hash=hashed_password)
        db.session.add(user)
        db.session.commit()

        return {"message": "User registered successfully."}, 201

    def post_login(self):
        """Log in a user."""
        data = request.json
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return {"message": "All fields are required."}, 400

        user = User.query.filter_by(username=username).first()
        if not user or not bcrypt.check_password_hash(user.password_hash, password):
            return {"message": "Invalid username or password."}, 401

        session["user_id"] = user.id
        return {"message": f"Welcome {username}!"}, 200

    @authenticate_user
    def post_logout(self):
        """Log out a user."""
        session.pop("user_id", None)
        return {"message": "Logged out successfully."}, 200


class IncidentReportResource(Resource):
    @authenticate_user
    def post(self):
        """Create a new incident report."""
        user_id = session["user_id"]
        data = request.json
        description = data.get("description")
        latitude = data.get("latitude")
        longitude = data.get("longitude")
        image_url = data.get("image_url")
        video_url = data.get("video_url")

        if not description or not latitude or not longitude:
            return {"message": "Description, latitude, and longitude are required."}, 400

        incident = IncidentReport(
            user_id=user_id,
            description=description,
            latitude=latitude,
            longitude=longitude,
            image_url=image_url,
            video_url=video_url
        )
        db.session.add(incident)
        db.session.commit()

        return {"message": "Incident reported successfully."}, 201

    @authenticate_user
    def get(self):
        """Get all incident reports for the logged-in user."""
        user_id = session["user_id"]
        incidents = IncidentReport.query.filter_by(user_id=user_id).all()
        return [incident.to_dict() for incident in incidents], 200

    @authenticate_user
    def put(self, incident_id):
        """Update an incident report."""
        user_id = session["user_id"]
        incident = IncidentReport.query.filter_by(id=incident_id, user_id=user_id).first()

        if not incident:
            return {"message": "Incident not found or unauthorized access."}, 404

        data = request.json
        incident.description = data.get("description", incident.description)
        incident.latitude = data.get("latitude", incident.latitude)
        incident.longitude = data.get("longitude", incident.longitude)
        incident.image_url = data.get("image_url", incident.image_url)
        incident.video_url = data.get("video_url", incident.video_url)
        incident.updated_at = datetime.datetime.utcnow()

        db.session.commit()
        return {"message": "Incident updated successfully."}, 200

# Add resources to the API
api.add_resource(UserResource, "/users", "/users/login", "/users/logout")
api.add_resource(IncidentReportResource, "/incidents", "/incidents/<int:incident_id>")

if __name__ == "__main__":
    app.run(debug=True)
