from app import db  # Import db from app.py

class IncidentImage(db.Model):
    __tablename__ = 'incident_images'

    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.Integer, db.ForeignKey('incident_reports.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)

    incident = db.relationship('IncidentReport', back_populates='images')  # Relationship to IncidentReport

    def __repr__(self):
        return f'<IncidentImage {self.id}>'

    def to_dict(self):
        return {
            'id': self.id,
            'report_id': self.report_id,
            'image_url': self.image_url
        }
