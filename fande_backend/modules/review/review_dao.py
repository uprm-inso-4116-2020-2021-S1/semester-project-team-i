import datetime

from config import db
from helpers.mixin import DaoOperations, OutputMixin


class Review(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True

    rid = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    description = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.uid'), nullable=False)
    dish_id = db.Column(db.Integer, db.ForeignKey('dish.did'), nullable=False)
