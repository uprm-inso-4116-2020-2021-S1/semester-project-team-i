from config import db


class Dish(db.Model):
    did = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float(precision=2))
    rating = db.Column(db.Integer)
    # TODO: add ingredients and category as enums
