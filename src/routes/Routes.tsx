import Dashboard from "../pages/dashboard/Dashboard";
import DisordersHistory from "../pages/disordersHistory/DisordersHistory";
import Charts from "../pages/charts/Charts";

export const mainRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    title: "Dashboard",
  },
  {
    path: "/disorder",
    element: <DisordersHistory />,
    title: "Dashboard",
  },
  {
    path: "/charts",
    element: <Charts />,
    title: "Dashboard",
  },
];
