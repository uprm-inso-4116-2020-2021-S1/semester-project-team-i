import datetime

from config import db


class Review(db.Model):
    rid = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    description = db.Column(db.String(100), nullable=False)
