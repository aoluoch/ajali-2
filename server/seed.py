from models import db, User, IncidentReport
import datetime

def seed_data():
    # Clear existing data
    db.session.query(IncidentReport).delete()
    db.session.query(User).delete()

    # Create users
    users = [
        User(username="john_doe", email="john@example.com", password_hash="hashed_password_1"),
        User(username="jane_smith", email="jane@example.com", password_hash="hashed_password_2"),
        User(username="michael_brown", email="michael@example.com", password_hash="hashed_password_3"),
        User(username="susan_clark", email="susan@example.com", password_hash="hashed_password_4"),
        User(username="alice_jones", email="alice@example.com", password_hash="hashed_password_5"),
    ]

    db.session.add_all(users)
    db.session.commit()

    # Create incident reports
    incident_reports = [
        IncidentReport(
            user_id=users[0].id,
            description="Car accident on Highway 1",
            latitude=-1.286389,
            longitude=36.817223,
            image_url="http://example.com/images/accident1.jpg",
            video_url="http://example.com/videos/accident1.mp4",
        ),
        IncidentReport(
            user_id=users[0].id,
            description="Fire outbreak in residential area",
            latitude=-1.2921,
            longitude=36.8219,
            image_url="http://example.com/images/fire1.jpg",
            video_url="http://example.com/videos/fire1.mp4",
        ),
        IncidentReport(
            user_id=users[1].id,
            description="Flooded road near city center",
            latitude=-1.2921,
            longitude=36.8279,
            image_url="http://example.com/images/flood1.jpg",
            video_url="http://example.com/videos/flood1.mp4",
        ),
        IncidentReport(
            user_id=users[2].id,
            description="Building collapse in downtown",
            latitude=-1.2930,
            longitude=36.8130,
            image_url="http://example.com/images/building1.jpg",
            video_url="http://example.com/videos/building1.mp4",
        ),
        IncidentReport(
            user_id=users[3].id,
            description="Hit-and-run incident reported",
            latitude=-1.2889,
            longitude=36.8150,
            image_url="http://example.com/images/hitrun1.jpg",
            video_url="http://example.com/videos/hitrun1.mp4",
        ),
        IncidentReport(
            user_id=users[4].id,
            description="Tree fallen on power lines",
            latitude=-1.2999,
            longitude=36.7999,
            image_url="http://example.com/images/tree1.jpg",
            video_url="http://example.com/videos/tree1.mp4",
        ),
        IncidentReport(
            user_id=users[1].id,
            description="Gas leak near the industrial area",
            latitude=-1.3000,
            longitude=36.8200,
            image_url="http://example.com/images/gasleak1.jpg",
            video_url="http://example.com/videos/gasleak1.mp4",
        ),
        IncidentReport(
            user_id=users[2].id,
            description="Animal attack in the park",
            latitude=-1.2819,
            longitude=36.8172,
            image_url="http://example.com/images/animal1.jpg",
            video_url="http://example.com/videos/animal1.mp4",
        ),
        IncidentReport(
            user_id=users[3].id,
            description="Protest blocking main road",
            latitude=-1.2788,
            longitude=36.8055,
            image_url="http://example.com/images/protest1.jpg",
            video_url="http://example.com/videos/protest1.mp4",
        ),
        IncidentReport(
            user_id=users[4].id,
            description="Oil spill on major highway",
            latitude=-1.2950,
            longitude=36.8150,
            image_url="http://example.com/images/oilspill1.jpg",
            video_url="http://example.com/videos/oilspill1.mp4",
        ),
    ]

    db.session.add_all(incident_reports)
    db.session.commit()

    print("Seed data successfully inserted!")

if __name__ == "__main__":
    seed_data()
