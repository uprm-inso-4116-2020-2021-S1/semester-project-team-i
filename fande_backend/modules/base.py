from helpers.decorator import error_validation


class BaseController:
    @staticmethod
    @error_validation(method=['GET'])
    def get_all(model):
        pass
