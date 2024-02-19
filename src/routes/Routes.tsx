import { ReactElement, lazy } from "react";
const Dashboard = lazy(() => import("../pages/public/Dashboard"));
const GlobalOverview = lazy(() => import("../pages/public/GlobalOverview"));
const ISP = lazy(() => import("../pages/public/ISP"));
const Disorders = lazy(() => import("../pages/private/Disorders"));
const Average = lazy(() => import("../pages/private/Average"));
const LastDisorders = lazy(() => import("../pages/private/LastDisorders"));
const PrivateDashboard = lazy(
  () => import("../pages/private/PrivateDashboard")
);
const Operators = lazy(() => import("../pages/public/Operators"));
const CurrentTraffic = lazy(() => import("../pages/public/CurrentTraffic"));
const Chart = lazy(() => import("../pages/private/Chat"));
import SpeedTest from "../pages/public/SpeedTest";
import NotFound from "../features/notfound/NotFound";

/**
 * Type definition for a main route in the application.
 */
export interface MainRoute {
  path: string;
  element: ReactElement;
  title: string;
}

/**
 * Main routes for the public section of the application.
 */
export const mainRoutes: MainRoute[] = [
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
    path: "/speed-test",
    element: <SpeedTest />,
    title: "Speed-Test",
  },
  {
    path: "/*",
    element: <NotFound />,
    title: "NotFound",
  },
];

/**
 * Main routes for the private section of the application.
 */
export const privateMainRoutes: MainRoute[] = [
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
  {
    path: "/private/chat",
    element: <Chart />,
    title: "chatBot",
  },
  {
    path: "/private/operators",
    element: <Operators />,
    title: "Operators",
  },
  {
    path: "/private/current-traffic",
    element: <CurrentTraffic />,
    title: "Current-traffic",
  },
];
