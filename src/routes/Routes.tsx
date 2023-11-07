// import { lazy } from "react";
import Dashboard from "../pages/public/Dashboard";
import GlobalOverview from "../pages/public/GlobalOverview";
import ISP from "../pages/public/ISP";
import Disorders from "../pages/public/Disorders";

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
