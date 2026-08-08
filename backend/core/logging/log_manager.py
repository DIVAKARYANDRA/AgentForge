"""
Central Log Manager.
"""

from core.logging import (
    JsonLogFormatter,
    LogEvent
)


class LogManager:

    def __init__(self):

        self.formatter = JsonLogFormatter()

    def info(
        self,
        module,
        event,
        message,
        **context
    ):

        print(

            self.formatter.format(

                LogEvent(

                    level="INFO",

                    module=module,

                    event=event,

                    message=message,

                    context=context

                )

            )

        )

    def error(
        self,
        module,
        event,
        message,
        **context
    ):

        print(

            self.formatter.format(

                LogEvent(

                    level="ERROR",

                    module=module,

                    event=event,

                    message=message,

                    context=context

                )

            )

        )