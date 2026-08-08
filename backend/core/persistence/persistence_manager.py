"""
Persistence Manager.
"""

from core.persistence import (
    SQLiteRepository
)


class PersistenceManager:

    def __init__(

        self

    ):

        self.repository = SQLiteRepository()


    def save(
        self,
        key,
        value
    ):

        self.repository.save(
            key,
            value
        )

    def get(
        self,
        key
    ):

        return self.repository.get(
            key
        )

    def delete(
        self,
        key
    ):

        self.repository.delete(
            key
        )

    def all(
        self
    ):

        return self.repository.all()

    def exists(
        self,
        key
    ):

        return self.get(
            key
        ) is not None

    def clear(
        self
    ):

        self.repository.records.clear()

    def close(
        self
    ):

        self.repository.close()