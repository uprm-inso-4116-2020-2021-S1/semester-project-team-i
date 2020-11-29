from flask import jsonify

from helpers.decorator import error_validation, verify_params
from modules.common.strategy import BaseAPIStrategy
from modules.dish.dish_dao import Dish
from modules.review.review_dao import Review
from modules.user.user_dao import User


class ReviewAPIStrategy(BaseAPIStrategy):
    @error_validation(method='GET')
    def get_all(self):
        reviews = Review.get_all_reviews()
        results_list = [review.to_dict() for review in reviews]
        result = {
            'message': 'Success!',
            'reviews': results_list,
        }
        return jsonify(result), 200

    def get_by_id(self, oid):
        if oid:
            try:
                review = Review.get_review_by_id(oid)
                if not review:
                    return jsonify(message='Review Not Found!'), 404
                result = {
                    'message': 'Success!',
                    'review': review.to_dict(),
                }
                return jsonify(result), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def create(self, params):
        valid_params = verify_params(params, Review.REVIEW_REQUIRED_PARAMS)
        if valid_params:
            try:
                user = User.get_user_by_id(valid_params.get('user_id', None))
                if not user or not user.isVerified:
                    return jsonify(message='User does not exist or is not verified'), 400
                new_review = Review(**valid_params)
                created_review = new_review.create()
                result = {
                    'message': 'Success!',
                    'review': created_review.to_dict(),
                }
                dish = Dish.get_dish_by_id(new_review.dish_id)
                if new_review.experience:
                    dish.rating += 2
                else:
                    dish.rating -= 2
                dish.update()
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400

    def update(self, oid, params):
        valid_params = verify_params(params, Review.REVIEW_REQUIRED_PARAMS)
        if oid and valid_params:
            try:
                review_to_update = Review.get_review_by_id(oid)
                old_dish = Dish.get_dish_by_id(review_to_update.dish_id)
                if not review_to_update:
                    return jsonify(message='Review Not Found!'), 404
                for key, value in valid_params.item():
                    setattr(review_to_update, key, value)
                review_to_update.update()
                result = {
                    'message': 'Success!',
                    'review': review_to_update.to_dict(),
                }
                if old_dish.did != review_to_update.dish_id:
                    new_dish = Dish.get_dish_by_id(review_to_update.dish_id)
                    if review_to_update.experience:
                        old_dish.rating -= 2
                        new_dish.rating += 2
                    else:
                        old_dish.rating += 2
                        new_dish.rating -= 2
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
                review_to_delete = Review.get_review_by_id(oid)
                if not review_to_delete:
                    return jsonify(message="Not Found!"), 404
                dish = Dish.get_dish_by_id(review_to_delete.dish_id)
                if review_to_delete.experience:
                    dish.rating -= 2
                else:
                    dish.rating += 2
                dish.update()
                review_to_delete.delete()
                return jsonify(message="Success!"), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
