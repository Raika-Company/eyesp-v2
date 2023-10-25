import { createTheme } from "@mui/material";

const BACKGROUND_GRADIENT = "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)";

const theme = createTheme({
  direction: "rtl",
  palette: {
    background: {
      default: BACKGROUND_GRADIENT,
    },
    text: {
      primary: "#C7C6C3",
    },
  },
  typography: {
    fontFamily: "Peyda",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: BACKGROUND_GRADIENT,
          backgroundAttachment: "fixed",
        },
      },
    },
  },
});

export default theme;