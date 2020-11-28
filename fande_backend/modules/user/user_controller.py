from modules.common.controller import BaseController
from modules.user.user_strategy import UserAPIStrategy, UserAuthenticationStrategy


user_api_strategy = UserAPIStrategy()
auth_strategy = UserAuthenticationStrategy()


class UserController(BaseController):
    def __init__(self):
        super(UserController, self).__init__(user_api_strategy, auth_strategy)
