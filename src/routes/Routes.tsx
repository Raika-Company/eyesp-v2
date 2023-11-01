import { lazy } from "react";
import Dashboard from "../pages/Dashboard";
const GlobalOverview = lazy(() => import("../pages/GlobalOverview"));
const Disorders = lazy(() => import("../pages/Disorders"));

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
  {
    path: "/disorders",
    element: <Disorders />,
    title: "Disorders",
  }
];
