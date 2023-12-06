import { FC, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { mainRoutes, privateMainRoutes } from "./routes/Routes";
import "./layout/global.css";
import theme from "./layout/theme";
import { MessageProvider } from "./context/MessageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";

const queryClient = new QueryClient({});
const DASHBOARD_PATH = "/";
const DASHBOARD_PATH_PRIVATE = "/private";

const App: FC = () => {
  const AppContent: FC = () => {
    const location = useLocation();
    const showSuspense =
      location.pathname !== DASHBOARD_PATH &&
      location.pathname !== DASHBOARD_PATH_PRIVATE;

    return showSuspense ? (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {mainRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          {privateMainRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    ) : (
      <Routes>
        {mainRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {privateMainRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    );
  };

  return (
    <MessageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Router>
            <AppContent />
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </MessageProvider>
  );
};

export default App;
