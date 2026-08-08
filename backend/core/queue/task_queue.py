"""
In-memory Task Queue.
"""

from collections import deque


class TaskQueue:

    def __init__(self):

        self._queue = deque()

    def enqueue(
        self,
        task
    ):

        self._queue.append(
            task
        )

    def dequeue(
        self
    ):

        if self._queue:

            return self._queue.popleft()

        return None


    @property
    def size(
        self
    ):

        return len(
            self._queue
        )

    def empty(
        self
    ):

        return self.size == 0