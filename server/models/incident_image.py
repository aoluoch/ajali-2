from sqlalchemy_serializer import SerializerMixin
from models.extensions import db


class IncidentImage(db.Model, SerializerMixin):
    __tablename__ = 'incident_images'

    serialize_rules = ('-incident',)

    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)

    # Relationship to IncidentReport with back-populate
    incident = db.relationship('IncidentReport', back_populates='images')