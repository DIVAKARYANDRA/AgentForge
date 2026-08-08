"""
AgentForge Tool Registry.

Central manager for all available tools.
"""

from typing import Dict, List, Any
from core.base.base_tool import BaseTool
from core.registry.registry_types import ToolRegistration


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

        self._tools[name] = ToolRegistration(
            name=name,
            tool=tool
        )

        category = getattr(tool, "category", "general")
        if category not in self.categories:
            self.categories[category] = []

        if name not in self.categories[category]:
            self.categories[category].append(name)

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