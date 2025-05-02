from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.incident_report import IncidentReport
from models.incident_image import IncidentImage
from models.incident_video import IncidentVideo
from models.user import User
from models.extensions import db
from utils.upload_utils import upload_file_to_cloudinary, delete_file_from_cloudinary

incidents = Blueprint('incidents', __name__)

def get_current_user():
    user_id = get_jwt_identity()
    return User.query.get(user_id)

@incidents.route('/incidents', methods=['POST'])
@jwt_required()
def create_incident():
    """Create a new incident report with optional media files"""
    try:
        current_user_id = get_jwt_identity()
        data = request.form.to_dict()
        
        # Validate required fields
        required_fields = ['description', 'latitude', 'longitude']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
            
        try:
            latitude = float(data['latitude'])
            longitude = float(data['longitude'])
        except ValueError:
            return jsonify({"error": "Invalid coordinates format"}), 400
            
        # Create incident report
        incident = IncidentReport(
            user_id=current_user_id,
            description=data['description'],
            latitude=latitude,
            longitude=longitude
        )
        db.session.add(incident)
        db.session.flush()  # Get the incident ID without committing
        
        # Handle image uploads
        if 'images' in request.files:
            images = request.files.getlist('images')
            for image in images:
                if image:
                    try:
                        upload_result = upload_file_to_cloudinary(image, resource_type="image")
                        incident_image = IncidentImage(
                            report_id=incident.id,
                            image_url=upload_result['url']
                        )
                        db.session.add(incident_image)
                    except Exception as e:
                        return jsonify({"error": f"Failed to upload image: {str(e)}"}), 400
        
        # Handle video uploads
        if 'videos' in request.files:
            videos = request.files.getlist('videos')
            for video in videos:
                if video:
                    try:
                        upload_result = upload_file_to_cloudinary(video, resource_type="video")
                        incident_video = IncidentVideo(
                            report_id=incident.id,
                            video_url=upload_result['url']
                        )
                        db.session.add(incident_video)
                    except Exception as e:
                        return jsonify({"error": f"Failed to upload video: {str(e)}"}), 400
        
        db.session.commit()
        return jsonify(incident.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Failed to create incident: {str(e)}"}), 400

@incidents.route('/incidents/<int:incident_id>', methods=['PUT'])
@jwt_required()
def update_incident(incident_id):
    """Update an existing incident report"""
    try:
        current_user = get_current_user()
        incident = IncidentReport.query.get_or_404(incident_id)
        
        # Verify ownership or admin status
        if incident.user_id != current_user.id and not current_user.is_admin:
            return jsonify({"error": "Unauthorized"}), 403
            
        data = request.get_json()
        
        # Update allowed fields
        if 'description' in data:
            incident.description = data['description']
        if 'latitude' in data:
            incident.latitude = data['latitude']
        if 'longitude' in data:
            incident.longitude = data['longitude']
            
        db.session.commit()
        return jsonify(incident.to_dict())
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@incidents.route('/incidents/<int:incident_id>', methods=['DELETE'])
@jwt_required()
def delete_incident(incident_id):
    """Delete an incident report and its associated media"""
    try:
        current_user = get_current_user()
        incident = IncidentReport.query.get_or_404(incident_id)
        
        # Verify ownership or admin status
        if incident.user_id != current_user.id and not current_user.is_admin:
            return jsonify({"error": "Unauthorized"}), 403
            
        # Delete associated media from Cloudinary and database
        for image in incident.images:
            public_id = image.image_url.split('/')[-1].split('.')[0]
            delete_file_from_cloudinary(public_id, "image")
            db.session.delete(image)
            
        for video in incident.videos:
            public_id = video.video_url.split('/')[-1].split('.')[0]
            delete_file_from_cloudinary(public_id, "video")
            db.session.delete(video)
            
        db.session.delete(incident)
        db.session.commit()
        
        return jsonify({"message": "Incident deleted successfully"})
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@incidents.route('/incidents', methods=['GET'])
@jwt_required()
def get_incidents():
    """Get all incidents while preserving edit/delete permissions"""
    try:
        # Get all incidents regardless of user
        incidents = IncidentReport.query.all()
        return jsonify([incident.to_dict() for incident in incidents])
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@incidents.route('/admin/incidents/<int:incident_id>/status', methods=['PUT'])
@jwt_required()
def update_incident_status(incident_id):
    """Update incident status (admin only)"""
    try:
        current_user = get_current_user()
        if not current_user.is_admin:
            return jsonify({"error": "Unauthorized. Admin access required."}), 403

        data = request.get_json()
        status = data.get('status')
        
        if status not in ['under investigation', 'rejected', 'resolved']:
            return jsonify({"error": "Invalid status"}), 400
            
        incident = IncidentReport.query.get_or_404(incident_id)
        incident.status = status
        db.session.commit()
        
        return jsonify(incident.to_dict())
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400