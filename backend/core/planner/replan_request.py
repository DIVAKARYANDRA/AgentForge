from dataclasses import dataclass


@dataclass
class ReplanRequest:

    failed_task_id: str

    reason: str

    previous_result: object = None