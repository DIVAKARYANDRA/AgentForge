"""
Application State Management.

Stores runtime objects shared across
the AgentForge application lifecycle.
"""


from typing import Optional

from core.container import Container


class ApplicationState:
    """
    Global application state.
    """


    def __init__(self):

        self.container: Optional[Container] = None



state = ApplicationState()