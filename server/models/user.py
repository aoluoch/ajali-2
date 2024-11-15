from sqlalchemy_serializer import SerializerMixin
from models.extensions import db


class User(db.Model, SerializerMixin,):
    __tablename__ = 'users'

    serialize_rules = ('-reports',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    # One-to-many relationship with IncidentReport using back-populate
    reports = db.relationship('IncidentReport', back_populates='user', lazy=True)


# =============================================================
# INSTRUCTIONS TO TURN THIS INTO A REST API
# =============================================================

# Step 1: Create a Flask REST API application
# -------------------------------------------
# You need to create a Flask app instance to set up your REST API.
# Example:
# from flask import Flask
# from flask_restful import Api
#
# app = Flask(__name__)
# api = Api(app)
#
# Step 2: Create a User Resource for RESTful Endpoints
# ----------------------------------------------------
# Use Flask-RESTful or Flask-Restx to create a resource that maps to this User model.
# Each resource should represent a CRUD action (GET, POST, PUT, DELETE).
#
# Example with Flask-RESTful:
# from flask_restful import Resource, reqparse
#
# class UserResource(Resource):
#     def get(self, user_id):
#         user = User.query.get_or_404(user_id)
#         return user.to_dict(), 200  # The SerializerMixin allows you to serialize the User object
#
#     def post(self):
#         # Use reqparse to parse incoming data (e.g., JSON payload)
#         parser = reqparse.RequestParser()
#         parser.add_argument('username', required=True)
#         parser.add_argument('email', required=True)
#         parser.add_argument('password', required=True)
#         args = parser.parse_args()
#
#         # Create a new user
#         new_user = User(username=args['username'], email=args['email'], password_hash=args['password'])
#         db.session.add(new_user)
#         db.session.commit()
#         return new_user.to_dict(), 201
#
# Step 3: Add Routes to the API
# -----------------------------
# Once you have the resource, map the endpoints to it using the api object.
# Example:
# api.add_resource(UserResource, '/users/<int:user_id>', '/users')
#
# Step 4: Create a SerializerMixin for Consistent JSON Responses
# --------------------------------------------------------------
# Since you're using SerializerMixin, this automatically provides methods like `to_dict()`
# which you can use to serialize your User model to JSON format.

# Step 5: Add Error Handling
# --------------------------
# Ensure you handle cases such as 404 (Not Found), validation errors, and other exceptions
# when creating or retrieving users.
#
# Example:
# if User.query.filter_by(username=args['username']).first():
#     return {"message": "User already exists"}, 400