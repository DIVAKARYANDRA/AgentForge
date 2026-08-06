"""
Base Memory Contract.
"""


from abc import ABC, abstractmethod

from typing import Any



class BaseMemory(ABC):

    """
    Common memory interface.
    """



    @abstractmethod
    async def store(
        self,
        key:str,
        value:Any
    ):
        pass



    @abstractmethod
    async def retrieve(
        self,
        key:str
    ):
        pass



    @abstractmethod
    async def delete(
        self,
        key:str
    ):
        pass



    @abstractmethod
    async def clear(
        self
    ):
        pass