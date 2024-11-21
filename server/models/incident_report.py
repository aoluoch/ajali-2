# models/incident_report.py

from sqlalchemy_serializer import SerializerMixin
from models.extensions import db
import datetime

class IncidentReport(db.Model, SerializerMixin):
    __tablename__ = 'incident_reports'

    serialize_rules = ('-user', '-images', '-videos',)

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    description = db.Column(db.Text, nullable=False)
    incident_type = db.Column(db.String(), nullable=False)
    status = db.Column(db.String(50), default='under investigation')  # Options: 'under investigation', 'resolved', 'rejected'
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.utcnow)

    # Relationship to User with backref
    user = db.relationship('User', backref='incident_reports', lazy=True)  # Removed trailing space

    # One-to-Many relationships with media models using backref
    images = db.relationship('IncidentImage', back_populates='incident', lazy=True)
    videos = db.relationship('IncidentVideo', back_populates='incident', lazy=True)