from app import app, db  # Ensure app and db are correctly imported from app.py
from models.user import User  # Make sure the models directory has an __init__.py file and that user.py exists and contains the User class
from models.incident_report import IncidentReport  # Similarly, ensure incident_report.py exists and contains the IncidentReport class
from models.incident_image import IncidentImage  # Check that incident_image.py exists and defines the IncidentImage class
from models.incident_video import IncidentVideo  # Make sure incident_video.py exists and contains the IncidentVideo class

def seed_data():
    # This block ensures you are within the Flask application context.
    # Without this, you won't be able to access the database (db.session will fail).
    with app.app_context():

        # Get user input for creating a new user
        print("Enter user details to seed into the database:")

        # Input user details
        username = input("Username: ")
        email = input("Email: ")
        password_hash = input("Password Hash (just a placeholder for now): ")  # Placeholder for the password (hashing is recommended for production)
        is_admin_input = input("Is this user an admin? (yes/no): ").strip().lower()

        # Set is_admin flag based on user input
        is_admin = True if is_admin_input == 'yes' else False

        # Create a new User object using the provided inputs
        user = User(username=username, email=email, password_hash=password_hash, is_admin=is_admin)

        # Add the new user to the session and commit (write) it to the database
        db.session.add(user)
        db.session.commit()

        print(f"User '{username}' created successfully!")

        # Input incident details
        description = input("Enter incident description: ")
        latitude = float(input("Enter latitude: "))
        longitude = float(input("Enter longitude: "))
        status = input("Enter incident status ('under investigation', 'resolved', 'rejected'): ").strip().lower()

        # Validate status input
        if status not in ['under investigation', 'resolved', 'rejected']:
            status = 'under investigation'  # Default to 'under investigation' if the input is invalid

        # Create a new IncidentReport object
        incident = IncidentReport(
            description=description,
            status=status,
            latitude=latitude,
            longitude=longitude,
            user_id=user.id  # Use the ID of the newly created user
        )

        # Add the new incident to the session and commit it to the database
        db.session.add(incident)
        db.session.commit()

        print(f"Incident Report created for user {user.username}!")

        # Optionally add an image to the incident
        image_url = input("Enter image URL for the incident (optional): ")
        if image_url:
            image = IncidentImage(report_id=incident.id, image_url=image_url)
            db.session.add(image)  # Add the image to the session
            db.session.commit()  # Commit the image to the database
            print(f"Image added to incident: {image_url}")

        # Optionally add a video to the incident
        video_url = input("Enter video URL for the incident (optional): ")
        if video_url:
            video = IncidentVideo(report_id=incident.id, video_url=video_url)
            db.session.add(video)  # Add the video to the session
            db.session.commit()  # Commit the video to the database
            print(f"Video added to incident: {video_url}")

        print("Seed data added successfully!")

# This ensures the script is only run when called directly, not when imported
if __name__ == '__main__':
    # Run the seeding function
    seed_data()

# COMMENTS TO FIX ERRORS:

# 1. Ensure your project has the following structure:
# ├── app.py              # Contains the app and db initialization
# ├── models              # Folder containing model files
# │   ├── __init__.py      # Makes 'models' a package (ensure this exists)
# │   ├── user.py          # Contains the User model
# │   ├── incident_report.py  # Contains the IncidentReport model
# │   ├── incident_image.py   # Contains the IncidentImage model
# │   ├── incident_video.py   # Contains the IncidentVideo model
# ├── seed.py             # The current file

# 2. If you encounter "ModuleNotFoundError", ensure that:
#    a. `models/__init__.py` exists.
#    b. Each model (User, IncidentReport, IncidentImage, IncidentVideo) is defined in its respective file.
#    c. The import paths are correct, and `models` folder is at the appropriate level.

# 3. Flask Application Context:
#    You must use `with app.app_context()` to ensure that the database connection (db.session) is correctly initialized when you run this script.

# 4. Database Session:
#    Always use `db.session.add()` to stage changes and `db.session.commit()` to write changes to the database.

# 5. Input Validation:
#    Ensure proper input validation is in place. For example, verify latitude and longitude are valid floats and incident status is one of the allowed values.