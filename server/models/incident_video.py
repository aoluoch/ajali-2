from sqlalchemy_serializer import SerializerMixin
from models.extensions import db


class IncidentVideo(db.Model, SerializerMixin):
    __tablename__ = 'incident_videos'

    serialize_rules = ('-incident',)

    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'), nullable=False)
    video_url = db.Column(db.String(255), nullable=False)

    # Relationship to IncidentReport with back-populate
    incident = db.relationship('IncidentReport', back_populates='videos')


# =============================================================
# INSTRUCTIONS TO TURN THIS INTO A REST API
# =============================================================

# Step 1: Create an IncidentVideo Resource
# ----------------------------------------
# Define a resource class to handle CRUD operations for `IncidentVideo`.
# The resource will map HTTP methods like GET, POST, and DELETE to handle video-related actions.
#
# Example using Flask-RESTful:
# from flask_restful import Resource, reqparse
#
# class IncidentVideoResource(Resource):
#     def get(self, video_id):
#         # Fetch an incident video by ID
#         video = IncidentVideo.query.get_or_404(video_id)
#         return video.to_dict(), 200  # Assuming SerializerMixin or manual serialization is used
#
#     def post(self):
#         # Parse incoming request data for creating a new incident video
#         parser = reqparse.RequestParser()
#         parser.add_argument('report_id', type=int, required=True)
#         parser.add_argument('video_url', type=str, required=True)
#         args = parser.parse_args()
#
#         # Create and save a new incident video
#         new_video = IncidentVideo(
#             report_id=args['report_id'],
#             video_url=args['video_url']
#         )
#         db.session.add(new_video)
#         db.session.commit()
#         return new_video.to_dict(), 201
#
#     def delete(self, video_id):
#         # Delete an incident video by ID
#         video = IncidentVideo.query.get_or_404(video_id)
#         db.session.delete(video)
#         db.session.commit()
#         return {"message": "Video deleted successfully"}, 200

# Step 2: Add Routes to the API
# -----------------------------
# Once the `IncidentVideoResource` is created, register it with the Flask API.
# Example:
# api.add_resource(IncidentVideoResource, '/incident_videos/<int:video_id>', '/incident_videos')
#
# This will map:
# - GET `/incident_videos/<int:video_id>` to retrieve a video by its ID.
# - POST `/incident_videos` to create a new video for an incident report.
# - DELETE `/incident_videos/<int:video_id>` to delete an existing video by its ID.

# Step 3: Use SerializerMixin or Define a to_dict() Method
# -------------------------------------------------------
# The response should be serialized to JSON. If you're not using `SerializerMixin`, define a `to_dict()` method in the `IncidentVideo` class:
#
#     def to_dict(self):
#         return {
#             'id': self.id,
#             'report_id': self.report_id,
#             'video_url': self.video_url,
#         }
#
# This will make it easy to return the video data in API responses.

# Step 4: Handle Relationships
# ----------------------------
# The `IncidentVideo` model is related to `IncidentReport` via a foreign key (`report_id`).
# When fetching or creating videos, you can access the parent `IncidentReport` data if needed (e.g., in a GET request).
#
# Example:
#     incident = video.incident.to_dict()  # If you need to include incident details in the video response

# Step 5: Error Handling
# ----------------------
# Ensure proper error handling for cases such as invalid video IDs, missing or invalid request data, and other potential issues.
#
# Example:
# if not video:
#     return {"message": "Video not found"}, 404

# Step 6: Optional Pagination
# ---------------------------
# If there are many videos related to incident reports, consider implementing pagination for the GET request to limit the number of results returned per page.