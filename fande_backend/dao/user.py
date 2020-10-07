import bcrypt

from config import db
from dao.mixin import OutputMixin, DaoOperations


class User(DaoOperations, OutputMixin, db.Model):
    # change table name to avoid conflicts with postgres User table
    __tablename__ = "users"

    RELATIONSHIPS_TO_DICT = True

    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    isVerified = db.Column(db.Boolean)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    upVotes = db.relationship('UpVote', backref=db.backref('user', lazy='subquery'), lazy=True)
    reviews = db.relationship('Review', backref=db.backref('user', lazy='subquery'), lazy=True)

    def __init__(self, **kwargs):
        self.username = kwargs['username']

    def create(self):
        self.password = bcrypt.hashpw(self.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        return super().create()

    def update_password(self, new_pw):
        self.password = bcrypt.hashpw(new_pw.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        return super().update()


class EstablishmentUser(User):
    __tablename__ = 'establishmentuser'
    uid = db.Column(db.Integer, db.ForeignKey('users.uid'), primary_key=True)
    establishments = db.relationship('Establishment', db.backref('establishmentuser', lazy='subquery'), lazy=True)
