from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy.exc import IntegrityError
from models.user import User
from models.incident_report import IncidentReport
from models.incident_image import IncidentImage
from models.incident_video import IncidentVideo
from db import db  # Import db from the new db.py file

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ajali.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the SQLAlchemy instance
db.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# ------------------------------- Routes for RESTful APIs -------------------------------

# Your routes remain unchanged
# Create an Incident Report (POST /api/incidents)
@app.route('/api/incidents', methods=['POST'])
def create_incident():
    data = request.get_json()

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

    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'message': 'Error creating incident. Check the data.'}), 400


# Get all Incident Reports (GET /api/incidents)
@app.route('/api/incidents', methods=['GET'])
def get_all_incidents():
    incidents = IncidentReport.query.all()
    return jsonify([incident.to_dict() for incident in incidents])


# Get a single Incident Report by ID (GET /api/incidents/<id>)
@app.route('/api/incidents/<int:id>', methods=['GET'])
def get_incident(id):
    incident = IncidentReport.query.get_or_404(id)
    return jsonify(incident.to_dict())


# Update an Incident Report (PUT /api/incidents/<id>)
@app.route('/api/incidents/<int:id>', methods=['PUT'])
def update_incident(id):
    data = request.get_json()
    incident = IncidentReport.query.get_or_404(id)

    incident.description = data.get('description', incident.description)
    incident.status = data.get('status', incident.status)
    incident.latitude = data.get('latitude', incident.latitude)
    incident.longitude = data.get('longitude', incident.longitude)

    db.session.commit()
    return jsonify(incident.to_dict())


# Delete an Incident Report (DELETE /api/incidents/<id>)
@app.route('/api/incidents/<int:id>', methods=['DELETE'])
def delete_incident(id):
    incident = IncidentReport.query.get_or_404(id)
    db.session.delete(incident)
    db.session.commit()
    return jsonify({'message': 'Incident report deleted'}), 204


# Create an Image for an Incident (POST /api/incidents/<incident_id>/images)
@app.route('/api/incidents/<int:incident_id>/images', methods=['POST'])
def add_image_to_incident(incident_id):
    data = request.get_json()
    new_image = IncidentImage(
        report_id=incident_id,
        image_url=data['image_url']
    )
    db.session.add(new_image)
    db.session.commit()
    return jsonify(new_image.to_dict()), 201


# Get all Images for an Incident (GET /api/incidents/<incident_id>/images)
@app.route('/api/incidents/<int:incident_id>/images', methods=['GET'])
def get_images_for_incident(incident_id):
    incident = IncidentReport.query.get_or_404(incident_id)
    return jsonify([image.to_dict() for image in incident.images])


# Create a Video for an Incident (POST /api/incidents/<incident_id>/videos)
@app.route('/api/incidents/<int:incident_id>/videos', methods=['POST'])
def add_video_to_incident(incident_id):
    data = request.get_json()
    new_video = IncidentVideo(
        report_id=incident_id,
        video_url=data['video_url']
    )
    db.session.add(new_video)
    db.session.commit()
    return jsonify(new_video.to_dict()), 201


# Get all Videos for an Incident (GET /api/incidents/<incident_id>/videos)
@app.route('/api/incidents/<int:incident_id>/videos', methods=['GET'])
def get_videos_for_incident(incident_id):
    incident = IncidentReport.query.get_or_404(incident_id)
    return jsonify([video.to_dict() for video in incident.videos])


# ------------------------------- Run the Application -------------------------------
if __name__ == '__main__':
    app.run(debug=True)