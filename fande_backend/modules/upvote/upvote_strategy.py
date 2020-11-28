from flask import jsonify

from helpers.decorator import error_validation, verify_params
from modules.common.strategy import BaseAPIStrategy
from modules.dish.dish_dao import Dish
from modules.upvote.upvote_dao import UpVote


class UpVoteAPIStrategy(BaseAPIStrategy):
    @error_validation(method='GET')
    def get_all(self):
        upvotes = UpVote.get_all_upvotes()
        result_list = [upvote.to_dict() for upvote in upvotes]
        result = {
            'message': 'Success!',
            'upvotes': result_list,
        }
        return jsonify(result), 200

    def get_by_id(self, oid):
        if oid:
            try:
                upvote = UpVote.get_upvote_by_id(oid)
                if not upvote:
                    return jsonify(message='UpVote Not Found!'), 404
                result = {
                    'message': 'Success!',
                    'upvote': upvote.to_dict(),
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def create(self, params):
        valid_params = verify_params(params, UpVote.UPVOTE_REQUIRED_PARAMS)
        if valid_params:
            try:
                new_upvote = UpVote(**valid_params)
                created_upvote = new_upvote.create()
                result = {
                    'message': 'Success!',
                    'upvote': created_upvote.to_dict(),
                }
                dish = Dish.get_dish_by_id(created_upvote.dish_id)
                dish.rating += 1
                dish.update()
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def update(self, oid, params):
        valid_params = verify_params(params, UpVote.UPVOTE_REQUIRED_PARAMS)
        if oid and valid_params:
            try:
                upvote_to_update = UpVote.get_upvote_by_id(oid)
                old_dish = Dish.get_dish_by_id(upvote_to_update.dish_id)
                if not upvote_to_update:
                    return jsonify(message='Upvote Not Found!'), 404
                for key, value in valid_params.items():
                    setattr(upvote_to_update, key, value)
                upvote_to_update.update()
                result = {
                    "message": "Success!",
                    "upvote": upvote_to_update.to_dict()
                }
                if upvote_to_update.dish_id != old_dish.did:
                    new_dish = Dish.get_dish_by_id(upvote_to_update.dish_id)
                    old_dish.rating -= 1
                    new_dish.rating += 1
                    old_dish.update()
                    new_dish.update()
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def delete(self, oid):
        if oid:
            try:
                upvote_to_delete = UpVote.get_upvote_by_id(oid)
                if not upvote_to_delete:
                    return jsonify(message="Not Found!"), 404
                dish = Dish.get_dish_by_id(upvote_to_delete.dish_id)
                dish.rating -= 1
                dish.update()
                upvote_to_delete.delete()
                return jsonify(message="Success!"), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
