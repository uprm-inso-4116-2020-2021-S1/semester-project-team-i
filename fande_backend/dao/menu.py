from config import db
from dao.mixin import OutputMixin, DaoOperations


class Menu(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True

    mid = db.Column(db.Integer, primary_key=True)
    establishments = db.relationship('Establishment', backref=db.backref('menu', lazy='subquery'), lazy=True)
    dishes = db.relationship('Dish', backref=db.backref('menu', lazy='subquery'), lazy=True)
