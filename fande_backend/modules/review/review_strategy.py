from flask import jsonify

from helpers.decorator import error_validation, verify_params
from modules.common.strategy import BaseAPIStrategy
from modules.review.review_dao import Review


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
                new_review = Review(**valid_params)
                created_review = new_review.create()
                result = {
                    'message': 'Success!',
                    'review': created_review.to_dict(),
                }
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
                for key, value in valid_params.item():
                    setattr(review_to_update, key, value)
                review_to_update.update()
                result = {
                    'message': 'Success!',
                    'review': review_to_update.to_dict(),
                }
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
                review_to_delete.delete()
                return jsonify(message="Success!"), 200
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 400
