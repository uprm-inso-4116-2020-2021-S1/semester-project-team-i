from flask import jsonify

from helpers.decorator import error_validation, verify_params
from modules.establishment.establishment_dao import Establishment


class EstablishmentController:
    @staticmethod
    @error_validation(method='GET')
    def get_all_establishments():
        establishments = Establishment.get_all_users()
        result_list = []
        for establishment in establishments:
            result_list.append(establishment.to_dict())
        result = {
            "message": "Success!",
            "users": result_list,
        }
        return jsonify(result), 200

    @staticmethod
    def get_establishment_by_id(eid):
        pass

    @staticmethod
    def create_establishment(json):
        valid_params = verify_params(json, Establishment.ESTABLISHMENT_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_establishment = Establishment(**valid_params)
                created_establishment = new_establishment.create()
                result = {
                    "message": "Success!",
                    "user": created_establishment.to_dict(),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    @staticmethod
    def update_establishment(eid, json):
        pass

    @staticmethod
    def delete_establishment(eid):
        pass
