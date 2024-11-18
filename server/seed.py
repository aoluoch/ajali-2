from app import app, db
from models.user import User
from models.incident_report import IncidentReport
from models.incident_image import IncidentImage
from models.incident_video import IncidentVideo

predefined_users = [
    {"username": "user1", "email": "user1@example.com", "password_hash": "hash1"},
    {"username": "user2", "email": "user2@example.com", "password_hash": "hash2"},
    {"username": "user3", "email": "user3@example.com", "password_hash": "hash3"},
    {"username": "user4", "email": "user4@example.com", "password_hash": "hash4"},
    {"username": "user5", "email": "user5@example.com", "password_hash": "hash5"},
    {"username": "user6", "email": "user6@example.com", "password_hash": "hash6"},
    {"username": "user7", "email": "user7@example.com", "password_hash": "hash7"},
    {"username": "user8", "email": "user8@example.com", "password_hash": "hash8"},
    {"username": "user9", "email": "user9@example.com", "password_hash": "hash9"},
    {"username": "user10", "email": "user10@example.com", "password_hash": "hash10"}
]

predefined_incidents = [
    {"description": "Incident 1", "status": "under investigation", "latitude": -1.286389, "longitude": 36.817223},
    {"description": "Incident 2", "status": "resolved", "latitude": -1.2833, "longitude": 36.8167},
    {"description": "Incident 3", "status": "under investigation", "latitude": -1.2901, "longitude": 36.8219},
    {"description": "Incident 4", "status": "rejected", "latitude": -1.2876, "longitude": 36.8148},
    {"description": "Incident 5", "status": "resolved", "latitude": -1.2890, "longitude": 36.8103},
    {"description": "Incident 6", "status": "under investigation", "latitude": -1.2850, "longitude": 36.8197},
    {"description": "Incident 7", "status": "rejected", "latitude": -1.2849, "longitude": 36.8139},
    {"description": "Incident 8", "status": "resolved", "latitude": -1.2828, "longitude": 36.8106},
    {"description": "Incident 9", "status": "under investigation", "latitude": -1.2835, "longitude": 36.8200},
    {"description": "Incident 10", "status": "rejected", "latitude": -1.2870, "longitude": 36.8165}
]

def seed_data():
    with app.app_context():
        for user_data in predefined_users:
            existing_user = User.query.filter_by(email=user_data["email"]).first()
            if existing_user:
                print(f"User {user_data['username']} already exists, skipping...")
                continue
            user = User(
                username=user_data["username"],
                email=user_data["email"],
                password_hash=user_data["password_hash"],
            )
            db.session.add(user)
            db.session.commit()
            print(f"User '{user.username}' created successfully!")

        users = User.query.all()
        for i, incident_data in enumerate(predefined_incidents):
            user = users[i % len(users)]
            existing_incident = IncidentReport.query.filter_by(description=incident_data["description"]).first()
            if existing_incident:
                print(f"Incident '{incident_data['description']}' already exists, skipping...")
                continue
            incident = IncidentReport(
                description=incident_data["description"],
                status=incident_data["status"],
                latitude=incident_data["latitude"],
                longitude=incident_data["longitude"],
                user_id=user.id
            )
            db.session.add(incident)
            db.session.commit()
            print(f"Incident '{incident.description}' created for user '{user.username}'!")

            image_url = f"http://example.com/image_{i+1}.jpg"
            video_url = f"http://example.com/video_{i+1}.mp4"

            image = IncidentImage(report_id=incident.id, image_url=image_url)
            video = IncidentVideo(report_id=incident.id, video_url=video_url)

            db.session.add(image)
            db.session.add(video)
            db.session.commit()
            print(f"Image and video added to incident '{incident.description}'.")

        print("Seeding completed successfully!")

if __name__ == '__main__':
    seed_data()