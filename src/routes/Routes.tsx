import Dashboard from "../pages/dashboard/Dashboard";
import DisordersHistory from "../pages/disordersHistory/DisordersHistory";

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
];
