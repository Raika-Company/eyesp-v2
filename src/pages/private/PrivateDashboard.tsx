import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FC, useState } from "react";
import LeftSide from "../../features/private_dashboard/LeftSide";
import RightSide from "../../features/private_dashboard/RightSide";
import Map from "../../components/ui/Map";

const PrivateDashboard: FC = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const [scale, setScale] = useState<number>(1);

  return (
    // The code that surely will be changed.
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)",
        boxShadow: "0 0 17px 10px rgba(255, 255, 255, 0.10)",
        marginY: "auto",
      }}
    >
      <Box
        sx={{
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          // Maybe temporary
          padding: "1rem",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isSmScreen
              ? "1fr"
              : isMdScreen
              ? "2fr 1fr"
              : `1fr ${isLgScreen ? "2.8" : "2.6"}fr 1fr`,
            gridTemplateRows: isSmScreen
              ? "repeat(3, auto)"
              : isMdScreen
              ? "repeat(2, auto)"
              : isLgScreen
              ? "1fr"
              : "1fr",
            alignItems: "center",
            gap: isLgScreen ? "2rem" : "1rem",
            paddingX: "2rem",
          }}
        >
          <LeftSide />
          <Map
            isPrivate
            scale={scale}
            setScale={setScale}
            isExportButtonVisible={false}
          />
          <RightSide />
        </Box>
      </Box>
    </Box>
  );
};

export default PrivateDashboard;
