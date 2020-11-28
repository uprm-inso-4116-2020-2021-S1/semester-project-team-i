class BaseController:
    def __init__(self, api_strategy, auth_strategy):
        self._api_strategy = api_strategy
        self._auth_strategy = auth_strategy

    def get_all(self):
        return self._api_strategy.get_all()

    def get_by_id(self, oid):
        return self._api_strategy.get_by_id(oid)

    def create(self, params):
        return self._api_strategy.create(params)

    def update(self, oid, params):
        return self._api_strategy.update(oid, params)

    def delete(self, oid):
        return self._api_strategy.delete(oid)

    def login(self, params):
        return self._auth_strategy.login(params)

    def logout(self):
        return self._auth_strategy.logout()
