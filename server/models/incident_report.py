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
    updated_at = db.Column(db.DateTime)

    user = db.relationship('User', back_populates='incidents')  # Relationship to User
    images = db.relationship('IncidentImage', back_populates='incident')  # Relationship to IncidentImage
    videos = db.relationship('IncidentVideo', back_populates='incident')  # Relationship to IncidentVideo

    def __repr__(self):
        return f'<IncidentReport {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'description': self.description,
            'status': self.status,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
