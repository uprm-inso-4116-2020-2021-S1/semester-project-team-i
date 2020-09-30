import datetime

from config import db


class UpVote(db.Model):
    vid = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow())

