from flask import jsonify

from helpers.decorator import error_validation, verify_params
from modules.common.strategy import BaseAPIStrategy
from modules.establishment.establishment_dao import Establishment


class EstablishmentAPIStrategy(BaseAPIStrategy):
    @error_validation(method='GET')
    def get_all(self):
        establishments = Establishment.get_all_establishments()
        result_list = []
        for establishment in establishments:
            result_list.append(establishment.to_dict())
        result = {
            "message": "Success!",
            "establishments": result_list,
        }
        return jsonify(result), 200

    def get_by_id(self, oid):
        if oid:
            try:
                establishment = Establishment.get_establishment_by_id(oid)
                if not establishment:
                    return jsonify(message="Establishment Not Found"), 404
                result = {
                    'message': 'Success!',
                    'establishment': establishment.to_dict(),
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def create(self, params):
        valid_params = verify_params(params, Establishment.ESTABLISHMENT_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_establishment = Establishment(**valid_params)
                created_establishment = new_establishment.create()
                result = {
                    "message": "Success!",
                    "establishment": created_establishment.to_dict(),
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def update(self, oid, params):
        valid_params = verify_params(params, Establishment.ESTABLISHMENT_REQUIRED_PARAMS)
        if oid and valid_params:
            try:
                establishment_to_update = Establishment.get_establishment_by_id(oid)
                if not establishment_to_update:
                    return jsonify(message="Not Found!"), 404
                for key, value in valid_params.items():
                    setattr(establishment_to_update, key, value)
                establishment_to_update.update()
                result = {
                    "message": "Success!",
                    "establishment": establishment_to_update.to_dict()
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def delete(self, oid):
        if oid:
            try:
                establishment_to_delete = Establishment.get_establishment_by_id(oid)
                if not establishment_to_delete:
                    return jsonify(message="Not Found!"), 404
                establishment_to_delete.delete()
                return jsonify(message="Success!"), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
