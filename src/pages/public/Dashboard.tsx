import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import LeftSide from "../../features/dashboard/LeftSide";
import RightSide from "../../features/dashboard/RightSide";
import Map from "../../components/ui/Map";
import domtoimage from "dom-to-image";
import calculateScale from "../../utils/convertWindowToScaleForMap";

/**
 * Dashboard component represents the main view of the application.
 * This component is responsible for rendering the main dashboard layout, which includes
 * a left side panel, a central map section, and a right side panel. It also handles
 * functionality such as resizing the map based on the screen size, capturing and
 * downloading screenshots of the map, and adjusting the layout based on the screen
 * size breakpoints.
 * 
 * @remarks
 * The component utilizes Material-UI's theming and media query hooks for responsive design.
 * It also makes use of the `dom-to-image` library to convert the map container to a PNG image
 * for downloading as a screenshot.
 */
const Dashboard: FC = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("xl"));

  const [isScreenShot, setIsScreenShot] = useState(false);
  const [isExportButtonVisible, setIsExportButtonVisible] = useState(true);
  const [scale, setScale] = useState<number>(calculateScale());

  useEffect(() => {
    const handler = () => setScale(calculateScale());
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  /**
 * Handles the generation and download of a screenshot of the map.
 */
  const handleScreenshot = () => {
    setIsExportButtonVisible(false);
    setIsScreenShot(true);

    setTimeout(() => {
      const mapElement = document.getElementById("mapContainer");
      if (mapElement) {
        domtoimage
          .toPng(mapElement)
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "map-screenshot.png";
            link.click();

            setIsScreenShot(false);
            setIsExportButtonVisible(true);
          })
          .catch((error) => {
            console.error("Screenshot failed", error);
            setIsScreenShot(false);
            setIsExportButtonVisible(true);
          });
      } else {
        console.error("Map element not found");
        setIsScreenShot(false);
        setIsExportButtonVisible(true);
      }
    }, 1000);
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: isMdScreen && !isLgScreen ? "start" : "center",
        marginY: "auto",
        paddingX: "1rem",
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
          paddingY: "1rem",
          maxWidth: "2000px",
        }}
      >
        <Box
          sx={{
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
            paddingX: isLgScreen ? "0" : "2rem",
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

// function cropCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
//   if (!(canvas instanceof HTMLCanvasElement)) {
//     throw new Error("Invalid canvas element");
//   }

//   const ctx = canvas.getContext("2d");
//   if (!ctx) {
//     throw new Error("Failed to get 2D context");
//   }

//   const cropWidth = 20;
//   const croppedCanvas = ctx.getImageData(
//     cropWidth,
//     0,
//     canvas.width - cropWidth,
//     canvas.height
//   );

//   const newCanvas = document.createElement("canvas");
//   newCanvas.width = canvas.width - cropWidth;
//   newCanvas.height = canvas.height;

//   const newCtx = newCanvas.getContext("2d");
//   if (!newCtx) {
//     throw new Error("Failed to get 2D context for new canvas");
//   }

//   newCtx.putImageData(croppedCanvas, 0, 0);

//   return newCanvas;
// }

// const handleScreenshot = () => {
//   setTimeout(() => {
//     setIsExportButtonVisible(false);
//     setIsScreenShot(true);
//     setTimeout(() => {
//       const mapElement = document.getElementById("mapContainer");
//       if (mapElement) {
//         const desiredWidth = 780;
//         const desiredHeight = 750;

//         html2canvas(mapElement, {
//           width: desiredWidth,
//           height: desiredHeight,

//           backgroundColor: null,
//         })
//           .then((canvas) => {
//             const croppedCanvas = cropCanvas(canvas);
//             const image = croppedCanvas.toDataURL("image/png");
//             const link = document.createElement("a");
//             link.href = image;
//             link.download = "map-screenshot.jpg";
//             link.click();

//             setTimeout(() => {
//               setIsScreenShot(false);
//               setIsExportButtonVisible(true);
//             }, 1000);
//           })
//           .catch((err) => {
//             console.error("Screenshot failed", err);
//             setIsScreenShot(false);
//             setIsExportButtonVisible(true);
//           });
//       } else {
//         console.error("Map element not found");
//         setIsScreenShot(false);
//         setIsExportButtonVisible(true);
//       }
//     }, 100);
//   }, 1000);
//   setScale(Math.max(scale / 1.8, 1));
// };
