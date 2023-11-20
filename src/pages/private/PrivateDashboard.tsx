import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import LeftSide from "../../features/private_dashboard/LeftSide";
import RightSide from "../../features/private_dashboard/RightSide";
import Map from "../../components/ui/Map";

const PrivateDashboard: FC = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("xl"));

  const outerBoxStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000",
    marginY: "auto",
    marginX: "1.5rem",
  };

  const innerBoxStyle = {
    borderRadius: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)",
    boxShadow: "0 0 17px 10px rgba(255, 255, 255, 0.10)",
    paddingY: "1rem",
    paddingX: "1rem",
  };

  const gridBoxStyle = {
    display: "grid",
    gridTemplateColumns: getGridTemplateColumns(
      isSmScreen,
      isMdScreen,
      isLgScreen
    ),
    gridTemplateRows: getGridTemplateRows(isSmScreen, isMdScreen),
    alignItems: "center",
    gap: isLgScreen ? "2rem" : "1rem",
  };

  return (
    <Box sx={outerBoxStyle}>
      <Box sx={innerBoxStyle}>
        <Box sx={gridBoxStyle}>
          <LeftSide />
          <Map isPrivate />
          <RightSide />
        </Box>
      </Box>
    </Box>
  );

  function getGridTemplateColumns(
    isSmScreen: boolean,
    isMdScreen: boolean,
    isLgScreen: boolean
  ): string {
    if (isSmScreen) {
      return "1fr";
    }
    if (isMdScreen) {
      return "2fr 1fr";
    }
    return `1fr ${isLgScreen ? "2.8" : "2.6"}fr 1fr`;
  }

  function getGridTemplateRows(
    isSmScreen: boolean,
    isMdScreen: boolean
  ): string {
    if (isSmScreen) {
      return "repeat(3, auto)";
    }
    if (isMdScreen) {
      return "repeat(2, auto)";
    }
    return "1fr";
  }
};

export default PrivateDashboard;
