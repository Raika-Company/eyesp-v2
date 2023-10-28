import { lazy } from "react";
import Dashboard from "../pages/Dashboard";
const GlobalOverview = lazy(() => import("../pages/GlobalOverview"));

export const mainRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    title: "Dashboard",
  },
  {
    path: "/global-overview",
    element: <GlobalOverview />,
    title: "Overview",
  },
];
