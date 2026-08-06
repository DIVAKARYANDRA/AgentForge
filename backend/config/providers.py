"""
Supported AI Providers.
"""

from enum import Enum


class Provider(str, Enum):

    GEMINI = "gemini"

    OPENAI = "openai"

    CLAUDE = "claude"

    OLLAMA = "ollama"