from modules.common.controller import BaseController
from modules.establishment.establishment_strategy import EstablishmentAPIStrategy


establishment_api_strategy = EstablishmentAPIStrategy()


class EstablishmentController(BaseController):
    def __init__(self):
        super(EstablishmentController, self).__init__(establishment_api_strategy, None)
