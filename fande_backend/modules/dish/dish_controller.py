from modules.common.controller import BaseController
from modules.dish.dish_strategy import DishAPIStrategy


dish_api_strategy = DishAPIStrategy()


class DishController(BaseController):
    def __init__(self):
        super(DishController, self).__init__(dish_api_strategy, None)

    def get_all(self, params=None):
        return self._api_strategy.get_all(params)
