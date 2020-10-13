from config import db
from helpers.mixin import DaoOperations, OutputMixin


class Dish(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True

    did = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float(precision=2))
    rating = db.Column(db.Integer)
    # TODO: add ingredients and category as enums
    upVotes = db.relationship('UpVote', backref=db.backref('dish', lazy='subquery'), lazy=True)
    reviews = db.relationship('Review', backref=db.backref('dish', lazy='subquery'), lazy=True)
    mid = db.Column(db.Integer, db.ForeignKey('menu.mid'), nullable=False)
