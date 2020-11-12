from config import db
from helpers.mixin import DaoOperations, OutputMixin


class Establishment(DaoOperations, OutputMixin, db.Model):
    RELATIONSHIPS_TO_DICT = True
    ESTABLISHMENT_REQUIRED_PARAMS = ['name', 'phone', 'location', 'openTime', 'closeTime', 'user_id',
                                     'openFromDay', 'openToDay', ]

    eid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(50))
    phone = db.Column(db.String(12), nullable=False)
    location = db.Column(db.String(50), nullable=False)
    openTime = db.Column(db.Time(timezone=True), nullable=False)
    closeTime = db.Column(db.Time(timezone=True), nullable=False)
    openFromDay = db.Column(db.String(10), nullable=False)
    openToDay = db.Column(db.String(10), nullable=False)
    # mid = db.Column(db.Integer, db.ForeignKey('menu.mid'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.uid'), nullable=False)
    user = db.relationship('User', backref='establishments', lazy=True)

    def __init__(self, **kwargs):
        super(Establishment, self).__init__(**kwargs)
        self.name = kwargs['name']
        self.description = kwargs.get('description', None)
        self.phone = kwargs['phone']
        self.location = kwargs['location']
        self.openTime = kwargs['openTime']
        self.closeTime = kwargs['closeTime']
        self.user_id = kwargs['user_id']
        self.openFromDay = kwargs['openFromDay']
        self.openToDay = kwargs['openToDay']

    @staticmethod
    def get_all_establishments():
        return Establishment.query.all()
