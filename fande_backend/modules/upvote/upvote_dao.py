from datetime import datetime

from config import db
from helpers.mixin import OutputMixin, DaoOperations


class UpVote(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    UPVOTE_REQUIRED_PARAMS = ['user_id', 'dish_id']

    vid = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.uid'), nullable=False)
    user = db.relationship('User', backref='upvotes', lazy=True)
    dish_id = db.Column(db.Integer, db.ForeignKey('dish.did'), nullable=False)
    dish = db.relationship('Dish', backref='upvotes', lazy=True)

    def __init__(self, **kwargs):
        super(UpVote, self).__init__(**kwargs)
        self.timestamp = kwargs.get('timestamp', datetime.utcnow().strftime('%d/%m/%Y %I:%M:%S %p'))
        self.user_id = kwargs['user_id']
        self.dish_id = kwargs['dish_id']

    @staticmethod
    def get_all_upvotes():
        return UpVote.query.all()

    @staticmethod
    def get_all_user_upvotes(uid):
        return UpVote.query.filter_by(user_id=uid)

    @staticmethod
    def get_all_dish_upvotes(did):
        return UpVote.query.filter_by(dish_id=did)

    @staticmethod
    def get_upvote_by_id(oid):
        return UpVote.query.filter_by(vid=oid).first()
