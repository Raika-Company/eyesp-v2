// import { lazy } from "react";
import Dashboard from "../pages/Dashboard";
import GlobalOverview from "../pages/GlobalOverview";
import ISP from "../pages/ISP";
import Disorders from "../pages/Disorders";
import LastDisorders from "../pages/lastDisorders/LastDisorders";

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
    title: "lastDisorders",
  },
];
