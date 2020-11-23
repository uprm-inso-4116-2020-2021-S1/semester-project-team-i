from abc import ABC, abstractmethod

from helpers.decorator import error_validation


class BaseAPIStrategy(ABC):
    @abstractmethod
    @error_validation(method=['GET'])
    def get_all(self):
        raise NotImplementedError('Must provide implementation in subclass.')

    @abstractmethod
    def get_by_id(self, oid):
        raise NotImplementedError('Must provide implementation in subclass.')

    @abstractmethod
    def create(self, params):
        raise NotImplementedError('Must provide implementation in subclass.')

    @abstractmethod
    def update(self, oid, params):
        raise NotImplementedError('Must provide implementation in subclass.')

    @abstractmethod
    def delete(self, oid):
        raise NotImplementedError('Must provide implementation in subclass.')


class AuthenticationStrategy(ABC):
    @abstractmethod
    def login(self):
        raise NotImplementedError('Must provide implementation in subclass.')

    @abstractmethod
    def logout(self):
        raise NotImplementedError('Must provide implementation in subclass.')
