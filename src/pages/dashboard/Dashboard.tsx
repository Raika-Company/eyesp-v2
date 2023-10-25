import {Box, useMediaQuery, useTheme} from "@mui/material";
import {FC} from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import Map from "./components/Map";

const Dashboard: FC = () => {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `1fr ${isLgScreen ? "3.5" : "2.5"}fr 1fr`,
          alignItems: "center",
          gap: isLgScreen ? "2rem" : "1rem",
        }}
      >
        <LeftSide />
        <Map />
        <RightSide />
      </Box>
    </Box>
  );
};

export default Dashboard;
