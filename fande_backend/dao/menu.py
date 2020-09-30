from config import db


class Menu(db.Model):
    mid = db.Column(db.Integer, primary_key=True)
