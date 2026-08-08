"""
AgentForge Tool Registry.

Central manager for all available tools.
"""

from typing import Dict, List, Any
from core.base.base_tool import BaseTool
from core.registry.registry_types import ToolRegistration
import os
import inspect
import importlib


class ToolRegistry:
    """
    Stores and manages tool instances.
    """

    def __init__(self):
        self._tools: Dict[str, ToolRegistration] = {}
        self.categories: Dict[str, List[str]] = {}

    def register(self, tool: BaseTool) -> None:
        """
        Register a tool.
        """
        name = tool.name

        self.validate_tool(tool)


        if hasattr(

            tool,

            "set_tool_registry"

        ):

            tool.set_tool_registry(

                self

            )


        self._tools[name] = ToolRegistration(
            name=name,
            tool=tool
        )

        category = getattr(tool, "category", "general")
        if category not in self.categories:
            self.categories[category] = []

        if name not in self.categories[category]:
            self.categories[category].append(name)

    def discover_tools(self):
        """
        Automatically discover and register
        all tools inside backend/tools.
        """

        tools_root = os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                "..",
                "..",
                "tools"
            )
        )

        for item in os.listdir(tools_root):

            tool_folder = os.path.join(
                tools_root,
                item
            )

            if not os.path.isdir(tool_folder):
                continue

            tool_file = os.path.join(
                tool_folder,
                "tool.py"
            )

            if not os.path.exists(tool_file):
                continue

            module_name = (
                f"tools.{item}.tool"
            )

            try:

                module = importlib.import_module(
                    module_name
                )

                for _, obj in inspect.getmembers(
                    module,
                    inspect.isclass
                ):

                    if (
                        issubclass(
                            obj,
                            BaseTool
                        )
                        and
                        obj is not BaseTool
                    ):

                        tool = obj()

                        self.validate_tool(tool)

                        self.register(tool)

                        print(
                            f"[ToolRegistry] "
                            f"Loaded "
                            f"{tool.category}/{tool.name}"
                        )

            except Exception as error:

                print(
                    f"[ToolRegistry] "
                    f"Failed loading "
                    f"{module_name}"
                )

                print(error)

    def unregister(self, name: str) -> None:
        """
        Remove a tool.
        """
        if name in self._tools:
            tool_reg = self._tools.pop(name)
            category = getattr(tool_reg.tool, "category", "general")
            if category in self.categories and name in self.categories[category]:
                self.categories[category].remove(name)

    def get(self, name: str) -> BaseTool:
        """
        Retrieve a tool.
        """
        registration = self._tools.get(name)

        if not registration:
            raise KeyError(f"Tool not found: {name}")

        return registration.tool

    def list_tools(self) -> List[str]:
        """
        Return available tool names.
        """
        return list(self._tools.keys())

    def exists(self, name: str) -> bool:
        """
        Check tool availability.
        """
        return name in self._tools

    def clear(self) -> None:
        """
        Remove all tools.
        """
        self._tools.clear()
        self.categories.clear()

    def get_tool_metadata(self) -> List[Dict[str, Any]]:
        """
        Return complete tool information for AI agents.
        """
        metadata = []

        for name, registration in self._tools.items():
            tool = registration.tool

            metadata.append({
                "name": tool.name,
                "description": tool.description,
                "capabilities": getattr(tool, "capabilities", []),
                "input_schema": getattr(tool, "input_schema", {}),
                "category": getattr(tool, "category", "general")
            })

        return metadata

    def get_tools_by_category(self, category: str) -> List[BaseTool]:
        """
        Retrieve all tool instances belonging to a specific category.
        """
        tool_names = self.categories.get(category, [])

        return [
            self._tools[name].tool
            for name in tool_names
            if name in self._tools
        ]

    def list_categories(self) -> List[str]:
        """
        Return list of registered category names.
        """
        return list(self.categories.keys())

    def validate_tool(self, tool):
        """
        Validate tool metadata before registration.
        """

        required_fields = [
            "name",
            "category",
            "description"
        ]

        for field in required_fields:

            value = getattr(
                tool,
                field,
                None
            )

            if not value:

                raise ValueError(
                    f"Tool '{tool.__class__.__name__}' "
                    f"is missing required field '{field}'"
                )

        if not hasattr(tool, "execute"):

            raise ValueError(
                f"{tool.name} "
                "does not implement execute()"
            )

        return True

    def statistics(self):

        return {

            "total_tools":
                len(self._tools),

            "total_categories":
                len(self.categories),

            "categories":
                self.categories,

            "tool_names":
                list(self._tools.keys())

        }

    async def health_status(self):

        status = {}

        for name, registration in self._tools.items():
            tool = registration.tool
            if hasattr(tool, "health_check"):
                status[name] = await tool.health_check()
            else:
                status[name] = {"status": "ok"}

        return status

    async def tool_health(self, name):

        tool = self.get(name)

        if hasattr(tool, "health_check"):
            return await tool.health_check()

        return {"status": "ok"}