"""
JSON Log Formatter.
"""

import json

from core.logging import LogEvent


class JsonLogFormatter:

    def format(
        self,
        event: LogEvent
    ):

        return json.dumps({

            "timestamp": event.timestamp,

            "level": event.level,

            "module": event.module,

            "event": event.event,

            "message": event.message,

            "context": event.context

        })