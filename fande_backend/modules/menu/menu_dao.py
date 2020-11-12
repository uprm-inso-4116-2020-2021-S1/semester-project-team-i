from config import db
from helpers.mixin import OutputMixin, DaoOperations


class Menu(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True

    mid = db.Column(db.Integer, primary_key=True)
    establishments = db.relationship('Establishment', uselist=False, backref='menu', lazy=True)
    dishes = db.relationship('Dish', backref='menu', lazy=True)

