"""
Token Service.

JWT implementation will come later.
"""


class TokenService:

    def create_token(
        self,
        user
    ):

        return "development-token"

    def validate(
        self,
        token
    ):

        return token == "development-token"