from modules.common.controller import BaseController
from modules.upvote.upvote_strategy import UpVoteAPIStrategy


upvote_api_strategy = UpVoteAPIStrategy()


class UpVoteController(BaseController):
    def __init__(self):
        super(UpVoteController, self).__init__(upvote_api_strategy, None)
