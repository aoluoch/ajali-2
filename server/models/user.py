from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash  # For password hashing and verification
from flask_cors import CORS

# Initialize the Flask app and extensions
app = Flask(__name__)
CORS(app)

# Configuration for the database URI (SQLite example)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/yourdatabase.db'  # Adjust path to your actual database
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking to save memory

# Initialize SQLAlchemy and Migrate
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Initialize Flask-RESTful API
api = Api(app)

# ------------------------------- User Model -------------------------------
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<User {self.username}>'

    def to_dict(self):
        """Method to convert User object to a dictionary."""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'is_admin': self.is_admin
        }

    def set_password(self, password):
        """Hashes and sets the user's password."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Checks if the provided password matches the stored hash."""
        return check_password_hash(self.password_hash, password)


# ------------------------------- User Resource for CRUD operations -------------------------------

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
                is_admin=data.get('is_admin', False)  # Default to False if not provided
            )

            # Hash and set the password
            new_user.set_password(data['password'])  # Ensure password is hashed

            db.session.add(new_user)  # Add user to the session
            db.session.commit()  # Commit to save in the database
            return jsonify(new_user.to_dict()), 201  # Return the newly created user

        except IntegrityError as e:
            db.session.rollback()  # Rollback if there’s an integrity error (e.g., duplicate username/email)
            return jsonify({'message': 'Error creating user. Check the data.'}), 400

    def put(self, id):
        """
        Update an existing user by ID
        """
        user = User.query.get_or_404(id)  # Get user by ID, or 404 if not found
        data = request.get_json()  # Get data from the request

        # Update the fields (only update the fields provided)
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.is_admin = data.get('is_admin', user.is_admin)

        # If password is provided, hash and update it
        if 'password' in data:
            user.set_password(data['password'])

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


# ------------------------------- Add User Resource to API -------------------------------

api.add_resource(UserResource, '/api/users', '/api/users/<int:id>')  # Define routes for UserResource

# ------------------------------- Run the Application -------------------------------

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Change to a different port if needed
