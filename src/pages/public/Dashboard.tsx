import { Box, useMediaQuery, useTheme } from "@mui/material";
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
  const [isExportButtonVisible, setIsExportButtonVisible] = useState(true);
  const [scale, setScale] = useState<number>(1);

  const handleScreenshot = () => {
    setTimeout(() => {
      setIsExportButtonVisible(false);
      setIsScreenShot(true);
      setTimeout(() => {
        const mapElement = document.getElementById("mapContainer");
        if (mapElement) {
          const desiredWidth = 700; // Set your desired width
          const desiredHeight = 760; // Set your desired height

          html2canvas(mapElement, {
            width: desiredWidth,
            height: desiredHeight,
          })
            .then((canvas) => {
              const croppedCanvas = cropCanvas(canvas); // Crop the canvas to remove white frame
              const image = croppedCanvas.toDataURL("image/png");
              const link = document.createElement("a");
              link.href = image;
              link.download = "map-screenshot.png";
              link.click();

              setTimeout(() => {
                setIsScreenShot(false);
                setIsExportButtonVisible(true);
              }, 1000);
            })
            .catch((err) => {
              console.error("Screenshot failed", err);
              setIsScreenShot(false);
              setIsExportButtonVisible(true);
            });
        } else {
          console.error("Map element not found");
          setIsScreenShot(false);
          setIsExportButtonVisible(true);
        }
      }, 100);
    }, 1000);
    setScale(Math.max(scale / 1.8, 1));
  };

  return (
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
            scale={scale}
            setScale={setScale}
            isExportButtonVisible={isExportButtonVisible}
            exports={handleScreenshot}
            isScreenShot={isScreenShot}
          />
          <RightSide />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

function cropCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
  // Ensure that canvas is an instance of HTMLCanvasElement
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Invalid canvas element");
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    // Handle the case where getContext returns null
    throw new Error("Failed to get 2D context");
  }

  const cropHeight = 20;
  const croppedCanvas = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height - cropHeight
  );

  const newCanvas = document.createElement("canvas");
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height - cropHeight;

  const newCtx = newCanvas.getContext("2d");
  if (!newCtx) {
    throw new Error("Failed to get 2D context for new canvas");
  }

  newCtx.putImageData(croppedCanvas, 0, 0);

  return newCanvas;
}
