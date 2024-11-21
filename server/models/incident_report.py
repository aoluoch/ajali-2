from sqlalchemy_serializer import SerializerMixin
from models.extensions import db
import datetime

class IncidentReport(db.Model, SerializerMixin):
    __tablename__ = 'incident_reports'

    serialize_rules = ('-user',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='under investigation') 
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.utcnow)

    # Media Fields
    image_url = db.Column(db.Text, nullable=True) 
    video_url = db.Column(db.Text, nullable=True)  

    # Relationship to User
    user = db.relationship('User', back_populates='incident_reports')
