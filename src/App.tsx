import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { mainRoutes, privateMainRoutes } from "./routes/Routes";
import { FC } from "react";
import "./layout/global.css";
import theme from "./layout/theme";
import { MessageProvider } from "./context/MessageContext";

const queryClient = new QueryClient({});

const App: FC = () => {
  return (
    <MessageProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              {mainRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
              {privateMainRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </MessageProvider>
  );
};

export default App;
