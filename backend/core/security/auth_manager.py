"""
Authentication Manager.
"""

from core.security import (
    TokenService,
    UserContext
)


class AuthenticationManager:

    def __init__(self):

        self.tokens = TokenService()

    def authenticate(
        self,
        token
    ):

        if not self.tokens.validate(
            token
        ):

            return None

        return UserContext(

            user_id="dev",

            username="developer",

            roles=["admin"],

            permissions=["*"],

            authenticated=True

        )