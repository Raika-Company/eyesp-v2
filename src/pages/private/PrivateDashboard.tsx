import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import LeftSide from "../../features/private_dashboard/LeftSide";
import RightSide from "../../features/private_dashboard/RightSide";
import Map from "../../components/ui/Map";
import calculateScale from "../../utils/convertWindowToScaleForMap";

/**
 * PrivateDashboard Component
 *
 * This component represents the private dashboard layout, including left side, map, and right side components.
 *
 * @component
 */
const PrivateDashboard: FC = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const isXgScreen = useMediaQuery("(min-width:1921px)");
  /**
   * State to manage the map scale
   */
  const [scale, setScale] = useState<number>(calculateScale());

  useEffect(() => {
    const handler = () => setScale(calculateScale());
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: isMdScreen && !isLgScreen ? "start" : "center",
        marginY: "autorem",
        background: "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)",
        boxShadow: "0 0 17px 10px rgba(255, 255, 255, 0.10)",
      }}
    >
      <Box
        sx={{
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem 1rem",
          maxWidth: "2500px",
        }}
      >
        <Box
          sx={{
            maxWidth: isXgScreen ? "80%" : "100%",
            display: "grid",
            gridTemplateColumns: isSmScreen
              ? "1fr"
              : isMdScreen
                ? "1fr"
                : `1fr 4fr 1fr`,
            gridTemplateRows: isLgScreen ? "1fr" : "repeat(3, auto)",
            alignItems: "center",
            gap: isLgScreen ? "2rem" : "0rem",
            rowGap: "1rem",
            paddingX: isLgScreen ? "0" : "1rem",
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
