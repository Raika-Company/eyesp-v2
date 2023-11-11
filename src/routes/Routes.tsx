// import { lazy } from "react";
import Dashboard from "../pages/public/Dashboard";
import GlobalOverview from "../pages/public/GlobalOverview";
import ISP from "../pages/public/ISP";
import Disorders from "../pages/private/Disorders";
import Average from "../pages/private/Average";
import LastDisorders from "../pages/private/LastDisorders";
import PrivateDashboard from "../pages/private/PrivateDashboard";
import Operators from "../pages/public/Operators";
import CurrentTraffic from "../pages/public/CurrentTraffic";

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
  {
    path: "/last-disorders",
    element: <LastDisorders />,
    title: "ISP",
  },
  {
    path: "/operators",
    element: <Operators />,
    title: "Operators",
  },
  {
    path: "/current-traffic",
    element: <CurrentTraffic />,
    title: "Current-traffic",
  },
];

export const privateMainRoutes = [
  {
    path: "/private",
    element: <PrivateDashboard />,
    title: "Dashboard",
  },
  {
    path: "/private/average",
    element: <Average />,
    title: "All Average",
  },
];
