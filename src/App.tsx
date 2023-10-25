import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { mainRoutes } from "./routes/Routes";
import { FC } from "react";

const theme = createTheme({
  direction: "rtl",
  palette: {
    background: {
      default: "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)",
    },
    text: {
      primary: "#C7C6C3",
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />

        <Routes>
          {mainRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
