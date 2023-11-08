// import { lazy } from "react";
import Dashboard from "../pages/public/Dashboard";
import GlobalOverview from "../pages/public/GlobalOverview";
import ISP from "../pages/public/ISP";
import Disorders from "../pages/private/Disorders";
import { PrivateDashboard } from "../pages/private/dashboard";

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
  },
  {
    path: "/isp",
    element: <ISP />,
    title: "ISP",
  },
];

export const privateMainRoutes = [
  {
    path: "/private",
    element: <PrivateDashboard />,
    title: "Dashboard",
  },
];
