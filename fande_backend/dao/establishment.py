from config import db


class Establishment(db.Model):
    eid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(50))
    phone = db.Column(db.String(12), nullable=False)
    extension = db.Column(db.String(4))
    location = db.Column(db.String(20), nullable=False)
    country = db.Column(db.String(20), nullable=False)      # consider using enum
    town = db.Column(db.String(20), nullable=False)         # consider using enum
    openTime = db.Column(db.Time(timezone=True))
    closeTime = db.Column(db.Time(timezone=True))
