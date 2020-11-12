from config import db
from helpers.mixin import DaoOperations, OutputMixin


class Establishment(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    ESTABLISHMENT_REQUIRED_PARAMS = ['name', 'phone', 'location', 'country',
                                     'town', 'openTime', 'closeTime', 'user_id']

    eid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(50))
    phone = db.Column(db.String(12), nullable=False)
    extension = db.Column(db.String(4))
    location = db.Column(db.String(20), nullable=False)
    country = db.Column(db.String(20), nullable=False)      # consider using enum
    town = db.Column(db.String(20), nullable=False)         # consider using enum
    openTime = db.Column(db.Time(timezone=True), nullable=False)
    closeTime = db.Column(db.Time(timezone=True), nullable=False)
    # mid = db.Column(db.Integer, db.ForeignKey('menu.mid'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.uid'), nullable=False)
    user = db.relationship('User', backref='establishments', lazy=True)

    def __init__(self, **kwargs):
        super(Establishment, self).__init__(**kwargs)
        self.name = kwargs['name']
        self.description = kwargs.get('description', None)
        self.phone = kwargs['phone']
        self.extension = kwargs.get('extension', None)
        self.location = kwargs['location']
        self.country = kwargs['country']
        self.town = kwargs['town']
        self.openTime = kwargs['openTime']
        self.closeTime = kwargs['closeTime']
        self.user_id = kwargs['user_id']

    @staticmethod
    def get_all_establishments():
        return Establishment.query.all()
