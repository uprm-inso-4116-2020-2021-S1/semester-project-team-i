import datetime

from config import db
from helpers.mixin import OutputMixin, DaoOperations


class UpVote(DaoOperations, OutputMixin, db.Model):
    __tablename__ = 'upvote'

    RELATIONSHIPS_TO_DICT = True

    vid = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.utcnow())
    uid = db.Column(db.Integer, db.ForeignKey('users.uid'), nullable=False)
    did = db.Column(db.Integer, db.ForeignKey('dish.did'), nullable=False)

