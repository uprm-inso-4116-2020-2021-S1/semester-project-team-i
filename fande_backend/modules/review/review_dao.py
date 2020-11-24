from datetime import datetime

from config import db
from helpers.mixin import DaoOperations, OutputMixin


class Review(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    REVIEW_REQUIRED_PARAMS = ['description', 'user_id', 'dish_id']

    rid = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.String(50))
    description = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.uid'), nullable=False)
    user = db.relationship('User', backref='reviews', lazy=True)
    dish_id = db.Column(db.Integer, db.ForeignKey('dish.did'), nullable=False)
    dish = db.relationship('Dish', backref='reviews', lazy=True)

    def __init__(self, **kwargs):
        super(Review, self).__init__(**kwargs)
        self.description = kwargs['description']
        self.timestamp = kwargs.get('timestamp', datetime.utcnow().strftime('%d/%m/%Y %I:%M:%S %p'))
        self.user_id = kwargs['user_id']
        self.dish_id = kwargs['dish_id']

    @staticmethod
    def get_all_reviews():
        return Review.query.all()

    @staticmethod
    def get_all_reviews_of_a_dish(did):
        return Review.query.filter_by(dish_id=did)

    @staticmethod
    def get_all_reviews_of_a_user(uid):
        return Review.query.filter_by(user_id=uid)

    @staticmethod
    def get_review_by_id(oid):
        return Review.query.filter_by(rid=oid).first()
