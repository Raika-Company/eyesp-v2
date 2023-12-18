import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { FC, useState } from "react";
import LeftSide from "../../features/dashboard/LeftSide";
import RightSide from "../../features/dashboard/RightSide";
import Map from "../../components/ui/Map";
import html2canvas from "html2canvas";

const Dashboard: FC = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const [isScreenShot, setIsScreenShot] = useState(false);

  const handleScreenshot = () => {
    setIsScreenShot(true);

    setTimeout(() => {
      const mapElement = document.getElementById("mapContainer");
      if (mapElement) {
        html2canvas(mapElement)
          .then((canvas) => {
            const image = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = image;
            link.download = "map-screenshot.png";
            link.click();

            setTimeout(() => {
              setIsScreenShot(false);
            }, 1000);
          })
          .catch((err) => {
            console.error("Screenshot failed", err);
            setIsScreenShot(false);
          });
      } else {
        console.error("Map element not found");
        setIsScreenShot(false);
      }
    }, 100);
  };

  return (
    // The code that surely will be changed.
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginY: "auto",
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

          // Maybe temporary
          paddingY: isLgScreen ? "2rem" : "1rem",
          paddingX: "3rem",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isSmScreen
              ? "1fr"
              : isMdScreen
              ? "2fr 1fr"
              : `1fr 2.8fr 1fr`,
            gridTemplateRows: isSmScreen
              ? "repeat(3, auto)"
              : isMdScreen
              ? "repeat(2, auto)"
              : isLgScreen
              ? "1fr"
              : "1fr",
            alignItems: "center",
            gap: isLgScreen ? "2rem" : "2rem",
          }}
        >
          <LeftSide />

          <Map isScreenShot={isScreenShot} />
          <RightSide />
        </Box>
      </Box>
      {/* <Button onClick={handleScreenshot}>Screenshot Map</Button> */}
    </Box>
  );
};

export default Dashboard;
