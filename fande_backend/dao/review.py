import datetime

from config import db
from dao.mixin import DaoOperations, OutputMixin


class Review(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True

    rid = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    description = db.Column(db.String(100), nullable=False)
    uid = db.Column(db.Integer, db.ForeignKey('users.uid'), nullable=False)
    did = db.Column(db.Integer, db.ForeignKey('dish.did'), nullable=False)
