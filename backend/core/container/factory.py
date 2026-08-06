"""
AgentForge Service Factory.

Responsible for creating
framework service instances.
"""


import logging


def create_logger():

    return logging.getLogger(
        "agentforge"
    )



def create_placeholder_service(
    name: str
):

    return {

        "service": name,

        "status": "not_initialized"

    }