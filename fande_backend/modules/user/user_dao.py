import bcrypt

from config import db
from helpers.mixin import OutputMixin, DaoOperations


class User(DaoOperations, OutputMixin, db.Model):
    # change table name to avoid conflicts with postgres User table
    __tablename__ = "users"

    RELATIONSHIPS_TO_DICT = True
    USER_REQUIRED_PARAMETERS = {'username', 'password', 'firstName', 'lastName', 'isVerified'}

    uid = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    isVerified = db.Column(db.Boolean)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    up_votes = db.relationship('UpVote', backref=db.backref('user', lazy='subquery'), lazy=True)
    reviews = db.relationship('Review', backref=db.backref('user', lazy='subquery'), lazy=True)

    def __init__(self, **kwargs):
        self.username = kwargs['username']
        self.password = kwargs['password']
        self.isVerified = kwargs['isVerified']
        self.firstName = kwargs['firstName']
        self.lastName = kwargs['lastName']
        self.email = kwargs['email']

    @staticmethod
    def get_all_users():
        return User.query.all()

    @staticmethod
    def verify_username(username):
        obj = User.query.filter(User.username == username).first()
        return True if obj else False

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
