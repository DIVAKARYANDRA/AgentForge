"""
Monitoring Models.
"""

from dataclasses import dataclass, field

from typing import Dict, List


@dataclass
class RuntimeMetrics:

    running_tasks: int = 0

    completed_tasks: int = 0

    failed_tasks: int = 0

    queued_tasks: int = 0

    active_agents: int = 0

    active_workflows: int = 0

    tool_executions: int = 0


@dataclass
class SystemHealth:

    runtime: bool = True

    queue: bool = True

    scheduler: bool = True

    event_bus: bool = True

    memory: bool = True

    providers: bool = True


@dataclass
class DashboardSnapshot:

    metrics: RuntimeMetrics

    health: SystemHealth

    recent_events: List = field(

        default_factory=list

    )

    analytics: Dict = field(

        default_factory=dict

    )