import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import MissionControl from "@/pages/MissionControl";
import Agents from "@/pages/Agents";
import Workflows from "@/pages/Workflows";
import Memory from "@/pages/Memory";
import Knowledge from "@/pages/Knowledge";
import Tools from "@/pages/Tools";
import Analytics from "@/pages/Analytics";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

/**
 * Central route table. Every primary-nav destination resolves to a real
 * page. Any unmatched path falls through to NotFound rather than a blank
 * screen or a router error.
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/mission-control" replace /> },
      { path: "mission-control", element: <MissionControl /> },
      { path: "agents", element: <Agents /> },
      { path: "workflows", element: <Workflows /> },
      { path: "memory", element: <Memory /> },
      { path: "knowledge", element: <Knowledge /> },
      { path: "tools", element: <Tools /> },
      { path: "analytics", element: <Analytics /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
