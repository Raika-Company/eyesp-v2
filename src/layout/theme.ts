import { createTheme } from "@mui/material";

declare module '@mui/system' {
  interface BreakpointOverrides {
    x2: true
  }
}

const BACKGROUND_GRADIENT = "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#C7C6C3",
    },
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
          // background: BACKGROUND_GRADIENT,
          background: 'black',
          backgroundAttachment: "fixed",
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 660,
      md: 960,
      lg: 1280,
      xl: 1300,
      x2: 1920 // Adding a new breakpoint
    },
  }

});

export default theme;