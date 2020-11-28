from modules.category.category_strategy import CategoryAPIStrategy
from modules.common.controller import BaseController


category_api_strategy = CategoryAPIStrategy()


class CategoryController(BaseController):
    def __init__(self):
        super(CategoryController, self).__init__(category_api_strategy, None)
