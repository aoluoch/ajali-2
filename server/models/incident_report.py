from app import db  # Import db from app.py
import datetime

class IncidentReport(db.Model):
    __tablename__ = 'incident_reports'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='under investigation')  # Options: 'under investigation', 'resolved', 'rejected'
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.utcnow)

    # Relationship to User with back-populates
    user = db.relationship('User', back_populates='reports')

    # One-to-Many relationships with media models using back-populates
    images = db.relationship('IncidentImage', back_populates='incident', lazy=True)
    videos = db.relationship('IncidentVideo', back_populates='incident', lazy=True)

# =============================================================
# INSTRUCTIONS TO TURN THIS INTO A REST API
# =============================================================

# Step 1: Create an IncidentReport Resource
# -----------------------------------------
# To expose this model via a REST API, create a Flask resource class to handle CRUD operations (GET, POST, PUT, DELETE).
#
# Example with Flask-RESTful:
# from flask_restful import Resource, reqparse
#
# class IncidentReportResource(Resource):
#     def get(self, report_id):
#         # Fetch an incident report by ID
#         report = IncidentReport.query.get_or_404(report_id)
#         return report.to_dict(), 200  # Assuming you're using a mixin like SerializerMixin for to_dict()

#     def post(self):
#         # Parse incoming request data for creating a new incident report
#         parser = reqparse.RequestParser()
#         parser.add_argument('user_id', type=int, required=True)
#         parser.add_argument('description', type=str, required=True)
#         parser.add_argument('latitude', type=float, required=True)
#         parser.add_argument('longitude', type=float, required=True)
#         args = parser.parse_args()

#         # Create and save a new incident report
#         new_report = IncidentReport(
#             user_id=args['user_id'],
#             description=args['description'],
#             latitude=args['latitude'],
#             longitude=args['longitude']
#         )
#         db.session.add(new_report)
#         db.session.commit()
#         return new_report.to_dict(), 201

#     def put(self, report_id):
#         # Parse incoming request data for updating an existing incident report
#         report = IncidentReport.query.get_or_404(report_id)
#         parser = reqparse.RequestParser()
#         parser.add_argument('status', type=str, choices=('under investigation', 'resolved', 'rejected'))
#         args = parser.parse_args()
#         
#         # Update status if provided
#         if args['status']:
#             report.status = args['status']
#         db.session.commit()
#         return report.to_dict(), 200

# Step 2: Add Routes to the API
# -----------------------------
# You need to register the resource class with Flask's API to expose the endpoints.
# Example:
# api.add_resource(IncidentReportResource, '/incident_reports/<int:report_id>', '/incident_reports')
#
# This will map:
# - GET `/incident_reports/<int:report_id>` to retrieve a report by its ID.
# - POST `/incident_reports` to create a new incident report.
# - PUT `/incident_reports/<int:report_id>` to update an incident report.
#
# Step 3: Use SerializerMixin or Manual Serialization
# ---------------------------------------------------
# The response from the resource methods should return the report data as JSON.
# You can use the `SerializerMixin` (or manually create a `to_dict()` method) to serialize the `IncidentReport` model to a dictionary.
#
# Example of `to_dict()` (if not using SerializerMixin):
#     def to_dict(self):
#         return {
#             "id": self.id,
#             "user_id": self.user_id,
#             "description": self.description,
#             "status": self.status,
#             "latitude": self.latitude,
#             "longitude": self.longitude,
#             "created_at": self.created_at.isoformat(),
#             "updated_at": self.updated_at.isoformat() if self.updated_at else None,
#             "images": [image.to_dict() for image in self.images],
#             "videos": [video.to_dict() for video in self.videos],
#         }

# Step 4: Handle Relationships
# ----------------------------
# The relationship to `User` and media models (like `IncidentImage` and `IncidentVideo`) can be included in the serialized response as needed.
# Ensure `to_dict()` on these related models returns their serialized form.
#
# For example:
# - `user.to_dict()` to return associated user details.
# - `image.to_dict()` for each related image in the incident report.
#
# Step 5: Handle Pagination (Optional)
# ------------------------------------
# If you have a large number of incident reports, you can implement pagination.
# Use SQLAlchemy's `.paginate()` method in your GET endpoint to limit the number of results per request.

# Step 6: Error Handling and Validation
# -------------------------------------
# Handle cases like missing or invalid data, user permission checks, and invalid report IDs.
#
# Example for missing fields:
# if 'description' not in args:
#     return {"message": "Description is required"}, 400
#
# Example for invalid ID:
# if not report:
#     return {"message": "Incident report not found"}, 404