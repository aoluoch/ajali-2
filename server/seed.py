from app import app, db
from models.user import User
from models.incident_report import IncidentReport
from models.incident_image import IncidentImage
from models.incident_video import IncidentVideo
from werkzeug.security import generate_password_hash

# Admin user details
admin_user = {
    "username": "admin",
    "email": "admin@gmail.com",
    "password": "123456",
    "is_admin": True
}

# Sample incidents for testing
sample_incidents = [
    {"description": "Traffic accident on Main Street", "status": "under investigation", "latitude": -1.286389, "longitude": 36.817223},
    {"description": "Flooding in Downtown area", "status": "resolved", "latitude": -1.2833, "longitude": 36.8167},
    {"description": "Power outage in Westlands", "status": "under investigation", "latitude": -1.2901, "longitude": 36.8219},
    {"description": "Road damage after heavy rain", "status": "under investigation", "latitude": -1.2876, "longitude": 36.8148},
    {"description": "Building collapse on Moi Avenue", "status": "under investigation", "latitude": -1.2890, "longitude": 36.8103}
]

def seed_data():
    with app.app_context():
        # Clear existing data
        print("Clearing existing data...")
        IncidentImage.query.delete()
        IncidentVideo.query.delete()
        IncidentReport.query.delete()
        User.query.delete()
        db.session.commit()
        print("Database cleared.")

        # Create admin user
        existing_admin = User.query.filter_by(email=admin_user["email"]).first()
        if existing_admin:
            print(f"Admin user with email {admin_user['email']} already exists, updating...")
            existing_admin.username = admin_user["username"]
            existing_admin.password_hash = generate_password_hash(admin_user["password"])
            existing_admin.is_admin = True
            db.session.commit()
            admin = existing_admin
        else:
            print(f"Creating new admin user with email {admin_user['email']}...")
            admin = User(
                username=admin_user["username"],
                email=admin_user["email"],
                password_hash=generate_password_hash(admin_user["password"]),
                is_admin=True
            )
            db.session.add(admin)
            db.session.commit()

        print(f"Admin user '{admin.username}' created/updated successfully!")

        # Create sample incidents
        for i, incident_data in enumerate(sample_incidents):
            incident = IncidentReport(
                description=incident_data["description"],
                status=incident_data["status"],
                latitude=incident_data["latitude"],
                longitude=incident_data["longitude"],
                user_id=admin.id
            )
            db.session.add(incident)
            db.session.commit()
            print(f"Incident '{incident.description}' created for admin user!")

            # Add sample image and video
            image_url = f"https://via.placeholder.com/800x600.png?text=Incident+{i+1}+Image"
            video_url = f"https://example.com/sample_video_{i+1}.mp4"

            image = IncidentImage(report_id=incident.id, image_url=image_url)
            video = IncidentVideo(report_id=incident.id, video_url=video_url)

            db.session.add(image)
            db.session.add(video)
            db.session.commit()
            print(f"Image and video added to incident '{incident.description}'.")

        print("Seeding completed successfully!")

if __name__ == '__main__':
    seed_data()