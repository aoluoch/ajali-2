from app import db  # Import db from app.py

class IncidentImage(db.Model):
    __tablename__ = 'incident_images'

    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)

    # Relationship to IncidentReport with back-populates
    incident = db.relationship('IncidentReport', back_populates='images')

# =============================================================
# INSTRUCTIONS TO TURN THIS INTO A REST API
# =============================================================

# Step 1: Create an IncidentImage Resource
# ----------------------------------------
# Define a resource class to handle CRUD operations for `IncidentImage` in your REST API.
# This will handle GET, POST, and DELETE operations for managing images related to incident reports.
#
# Example using Flask-RESTful:
# from flask_restful import Resource, reqparse
#
# class IncidentImageResource(Resource):
#     def get(self, image_id):
#         # Fetch an incident image by ID
#         image = IncidentImage.query.get_or_404(image_id)
#         return image.to_dict(), 200  # Assuming you're using SerializerMixin or to_dict() for serialization
#
#     def post(self):
#         # Parse incoming request data for creating a new incident image
#         parser = reqparse.RequestParser()
#         parser.add_argument('report_id', type=int, required=True, help="Report ID is required")
#         parser.add_argument('image_url', type=str, required=True, help="Image URL is required")
#         args = parser.parse_args()
#
#         # Create and save a new incident image
#         new_image = IncidentImage(
#             report_id=args['report_id'],
#             image_url=args['image_url']
#         )
#         db.session.add(new_image)
#         db.session.commit()
#         return new_image.to_dict(), 201
#
#     def delete(self, image_id):
#         # Delete an incident image by ID
#         image = IncidentImage.query.get_or_404(image_id)
#         db.session.delete(image)
#         db.session.commit()
#         return {"message": "Image deleted successfully"}, 200

# Step 2: Add Routes to the API
# -----------------------------
# Once the `IncidentImageResource` is created, register it with the Flask API.
# Example:
# api.add_resource(IncidentImageResource, '/incident_images/<int:image_id>', '/incident_images')
#
# This will map:
# - GET `/incident_images/<int:image_id>` to retrieve an image by its ID.
# - POST `/incident_images` to create a new image for an incident report.
# - DELETE `/incident_images/<int:image_id>` to delete an existing image by its ID.

# Step 3: Use SerializerMixin or Define a to_dict() Method
# -------------------------------------------------------
# The response should be serialized to JSON. If you're not using `SerializerMixin`, define a `to_dict()` method in the `IncidentImage` class:
#
#     def to_dict(self):
#         return {
#             'id': self.id,
#             'report_id': self.report_id,
#             'image_url': self.image_url,
#         }
#
# This will make it easy to return the image data in API responses.

# Step 4: Handle Relationships
# ----------------------------
# The `IncidentImage` model is related to `IncidentReport` via the foreign key `report_id`.
# When fetching images, you can access the parent `IncidentReport` if needed (e.g., in a GET request).
#
# Example:
#     report = image.incident.to_dict()  # If you need to include incident details in the image response

# Step 5: Error Handling
# ----------------------
# Ensure proper error handling for cases such as invalid image IDs, missing fields, or invalid request data.
#
# Example:
# if not image:
#     return {"message": "Image not found"}, 404

# Step 6: Optional Pagination
# ---------------------------
# If there are many images for an incident report, consider implementing pagination for the GET request to limit the number of results returned per page.