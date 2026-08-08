"""
Base Repository.
"""

from abc import ABC
from abc import abstractmethod


class BaseRepository(ABC):

    @abstractmethod
    def save(
        self,
        key,
        value
    ):
        pass


    @abstractmethod
    def get(
        self,
        key
    ):
        pass


    @abstractmethod
    def delete(
        self,
        key
    ):
        pass


    @abstractmethod
    def all(
        self
    ):
        pass