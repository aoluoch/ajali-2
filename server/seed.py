from server.app import app, db  # Correct import from server.app
from server.models.user import User  # Correct import from server.models
from server.models.incident_report import IncidentReport  # Correct import from server.models
from server.models.incident_image import IncidentImage  # Correct import from server.models
from server.models.incident_video import IncidentVideo  # Correct import from server.models

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
