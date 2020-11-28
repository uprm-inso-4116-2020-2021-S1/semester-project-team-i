from modules.common.controller import BaseController
from modules.review.review_strategy import ReviewAPIStrategy


review_api_strategy = ReviewAPIStrategy()


class ReviewController(BaseController):
    def __init__(self):
        super(ReviewController, self).__init__(review_api_strategy, None)
