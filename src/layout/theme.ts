import { createTheme } from "@mui/material";

/**
 * Extends the `BreakpointOverrides` interface from MUI system to include a new breakpoint `x2`.
 */
declare module "@mui/system" {
  interface BreakpointOverrides {
    x2: true;
  }
}
const themes = createTheme();

/**
 * Defines the background gradient used in the theme.
 */
const BACKGROUND_GRADIENT =
  "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)";

/**
* Creates a Material-UI theme with customizations.
*/
const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
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
    fontFamily: "PeydaRegular",
    h1: {
      fontSize: "18px",
      [themes.breakpoints.up("md")]: {
        fontSize: "28px",
      },
      fontFamily: "PeydaSemibold",
    },
    h2: {
      fontSize: "18px",
      [themes.breakpoints.up("md")]: {
        fontSize: "24px",
      },
      fontFamily: "PeydaRegular",
    },
    h3: {
      fontSize: "14px",
      [themes.breakpoints.up("md")]: {
        fontSize: "20px",
      },
      fontFamily: "PeydaRegular",
    },
    h4: {
      fontSize: "14px",
      [themes.breakpoints.up("md")]: {
        fontSize: "16px",
      },
      fontFamily: "PeydaSemibold",
    },
    h5: {
      fontSize: "14px",
      [themes.breakpoints.up("md")]: {
        fontSize: "16px",
      },
      fontFamily: "PeydaLight",
    },
    h6: {
      fontSize: "14px",
      [themes.breakpoints.up("md")]: {
        fontSize: "16px",
      },
      fontFamily: "PeydaRegular",
    },
    body1: {
      fontSize: "14px",
      [themes.breakpoints.up("md")]: {
        fontSize: "16px",
      },
      fontFamily: "PeydaSemibold",
    },
    body2: {
      fontSize: "12px",
      [themes.breakpoints.up("md")]: {
        fontSize: "14px",
      },
      fontFamily: "PeydaRegular",
    },
    subtitle1: {
      fontSize: "12px",
      fontFamily: "PeydaRegular",
    },
    subtitle2: {
      fontSize: "10px",
      fontFamily: "PeydaLight",
    },
    button: {
      fontSize: "14px",
      [themes.breakpoints.up("md")]: {
        fontSize: "16px",
      },
      fontFamily: "PeydaSemibold",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // background: BACKGROUND_GRADIENT,
          background: "black",
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
      x2: 1920, // Adding a new breakpoint
    },
  },
});

export default theme;
