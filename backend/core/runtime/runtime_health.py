"""
Runtime Health Monitoring.

Checks runtime dependencies.
"""


class RuntimeHealthChecker:


    def __init__(
        self,
        runtime
    ):

        self.runtime = runtime



    async def check(self):

        status = {

            "runtime": True,

            "provider": False,

            "memory": False,

            "tools": False

        }


        if self.runtime.provider:

            status["provider"] = True


        if self.runtime.memory:

            status["memory"] = True


        if self.runtime.tools:

            status["tools"] = True



        status["healthy"] = all(

            status.values()

        )


        return status