from config import db


class User(db.Model):
    # change table name to avoid conflicts with postgres User table
    __tablename__ = "users"

    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    isVerified = db.Column(db.Boolean)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)



