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
    openTime = db.Column(db.String(10), nullable=False)    # db.TIme(timezone=True)
    closeTime = db.Column(db.String(10), nullable=False)
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

    @staticmethod
    def get_establishment_by_id(e_id):
        return Establishment.query.filter_by(eid=e_id).first()

    @staticmethod
    def get_establishment_by_location(e_location):
        return Establishment.query.filter_by(location=e_location).first()

    @staticmethod
    def get_establishment_by_name(e_name):
        return Establishment.query.filter_by(name=e_name).first()
    #no estoy completamente seguro pero creo que estos proximos pueden ser useful
    @staticmethod
    def get_establishment_by_open_time(e_open_time):
        return Establishment.query.filter_by(openTime=e_open_time)
    
    @staticmethod
    def get_establishment_phone(e_id):
        return Establishment.query.filter_by(eid=e_id).first().phone

    @staticmethod
    def get_establishment_location(e_id):
        return Establishment.query.filter_by(eid=e_id).first().location

    #no estoy seguro de que este funcione pero creo que si
    @staticmethod
    def get_horario(e_name):
        obj = Establishment.query.filter_by(name=e_name).first
        result = [obj.openFromDay, obj.openToDay,obj.openTime, obj.closeTime]
        return result

