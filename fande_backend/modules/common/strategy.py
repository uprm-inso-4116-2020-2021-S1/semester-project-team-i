from abc import ABC, abstractmethod

from helpers.decorator import error_validation


class BaseAPIStrategy(ABC):
    @staticmethod
    @abstractmethod
    @error_validation(method=['GET'])
    def get_all():
        raise NotImplementedError('Must provide implementation in subclass.')

    @staticmethod
    @abstractmethod
    def get_by_id(oid):
        raise NotImplementedError('Must provide implementation in subclass.')

    @staticmethod
    @abstractmethod
    def create(params):
        raise NotImplementedError('Must provide implementation in subclass.')

    @staticmethod
    @abstractmethod
    def update(oid, params):
        raise NotImplementedError('Must provide implementation in subclass.')

    @staticmethod
    @abstractmethod
    def delete(oid):
        raise NotImplementedError('Must provide implementation in subclass.')


class AuthenticationStrategy(ABC):
    @abstractmethod
    def login(self):
        raise NotImplementedError('Must provide implementation in subclass.')

    @abstractmethod
    def logout(self):
        raise NotImplementedError('Must provide implementation in subclass.')
