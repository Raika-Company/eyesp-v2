import { Box, SvgIcon, useMediaQuery, useTheme, Button } from "@mui/material";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapPaths from "../../features/dashboard/ـcomponents/MapPaths";
import { AnimatedCircle } from "./AnimatedCircle";
import provinceCoordsData from "../../../public/data/provincesCoords.json";
import {
  ProvinceCoordsType,
  getProvinceData,
  mockProvinceListsForPrivate,
} from "../../lib/MapHelpers";
import { ClickableButton } from "./Button";
import StatusTooltip from "./StatusTooltip";

const provinceCoords = provinceCoordsData as ProvinceCoordsType;

interface Props {
  isPrivate?: boolean;
  isScreenShot?: boolean;
  exports?: () => void;
  isExportButtonVisible: boolean;
  scale: number;
  setScale: (scale: number) => void;
}

const Map: FC<Props> = ({
  isPrivate = false,
  isScreenShot = false,
  exports,
  isExportButtonVisible,
  scale,
  setScale,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLgDownScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const isXlgScreen = useMediaQuery("(min-width:2000px)");
  const is2XlgScreen = useMediaQuery("(min-width:2400px)");
  const is3XlgScreen = useMediaQuery("(min-width:2800px)");
  const is4XlgScreen = useMediaQuery("(min-width:3200px)");

  const [dragging, setDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const zoomIn = () => {
    const newScale = scale * 1.04;
    setScale(newScale);
  };

  // useEffect(() => {
  //   zoomIn();
  // }, []);
  const zoomOut = () => {
    setScale(Math.max(scale / 1.1, 1));
  };

  const startDrag = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (isPrivate && scale !== 1) {
      setDragging(true);
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const onDrag = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (isPrivate && scale !== 1) {
      if (dragging) {
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        const svgRect = svgContainerRef.current!.getBoundingClientRect();
        const containerRect = svgContainerRef.current!.getBoundingClientRect();

        // Calculate the new position within the boundaries
        let newX = Math.min(containerRect.width - svgRect.width / scale, dx);
        let newY = Math.min(containerRect.height - svgRect.height / scale, dy);

        // Prevent dragging beyond the left and top bounds
        newX = Math.max(-150 * scale, newX);
        newY = Math.max(-150 * scale, newY);

        setPosition({
          x: newX,
          y: newY,
        });
      }
    }
  };

  const endDrag = () => {
    if (isPrivate && scale !== 1) {
      setDragging(false);
    }
  };

  const [provinceData, setProvinceData] = useState<
    | {
        id: number;
        name: string;
        color: string;
        igw: string;
        ipx: string;
        igwColor: string;
        ipxColor: string;
      }[]
    | null
  >(null);
  useEffect(() => {
    getProvinceData().then((res) => setProvinceData(res));
  }, []);

  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  return (
    <>
      <Box
        id="mapContainer"
        sx={{
          position: "relative",
          overflow: "hidden",
          maxWidth: "100%",
          height: "100%",
          order: isLgDownScreen ? "-1" : "0",
          gridColumnEnd: !isLgScreen && !isSmScreen ? "span 2" : "span 1",
        }}
        ref={svgContainerRef}
      >
        <SvgIcon
          sx={{
            width: "100%",
            height: "100%",
            maxHeight: "80dvh",
            boxShadow: "0px 12px 32.13126px 0px rgba(0, 0, 0, 0.50)",
          }}
        >
          {/* <Link to="/disorders"> */}
          <svg
            preserveAspectRatio="none"
            width={
              is4XlgScreen
                ? "1600"
                : is3XlgScreen
                ? "1500"
                : is2XlgScreen
                ? "1400"
                : isXlgScreen
                ? "1200"
                : "1000"
            }
            height="950"
            viewBox={
              is4XlgScreen
                ? "450 600 1600 1200"
                : is3XlgScreen
                ? "500 600 1500 1200"
                : is2XlgScreen
                ? "550 650 1400 1100"
                : isXlgScreen
                ? "600 700 1300 1100"
                : "680 750 1200 1000"
            }
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "relative",
              transform: `scale(${scale})`,
              top: `${position.y}px`,
              left: `${position.x}px`,
              transition: "transform .2s ease",
              cursor: dragging
                ? "grabbing"
                : scale !== 1
                ? "pointer"
                : "initial",
            }}
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onClick={() => {
              if (isPrivate) {
                navigate("/last-disorders");
              } else {
                navigate("/disorders");
              }
            }}
          >
            <MapPaths
              provinceList={isPrivate ? mockProvinceListsForPrivate : {}}
            />
            {!isPrivate &&
              provinceData &&
              provinceData.map((province, index) => (
                <Fragment key={province.id}>
                  <circle
                    cx={provinceCoords[province.name].x}
                    cy={provinceCoords[province.name].y}
                    fill={province.color}
                    r="8"
                  />
                  <AnimatedCircle
                    cx={provinceCoords[province.name].x}
                    cy={provinceCoords[province.name].y}
                    stroke={province.color}
                    opacity=".40"
                    index={index}
                    r="8"
                  />
                  <AnimatedCircle
                    cx={provinceCoords[province.name].x}
                    cy={provinceCoords[province.name].y}
                    stroke={province.color}
                    opacity=".30"
                    index={index}
                    r="12"
                  />
                  <AnimatedCircle
                    cx={provinceCoords[province.name].x}
                    cy={provinceCoords[province.name].y}
                    stroke={province.color}
                    opacity=".2"
                    index={index}
                    r="16"
                  />
                  <circle
                    cx={provinceCoords[province.name].x}
                    cy={provinceCoords[province.name].y}
                    fill="transparent"
                    onMouseEnter={(e) => {
                      setTooltipPosition({ x: e.pageX, y: e.pageY });

                      setHoveredProvince(province.name);
                    }}
                    onMouseLeave={() => setHoveredProvince(null)}
                    r="20"
                    style={{
                      zIndex: "20",
                    }}
                  />
                </Fragment>
              ))}
          </svg>

          {/* </Link> */}
        </SvgIcon>
        <Box
          sx={{
            display: "flex",
            top: "1rem",
            gap: "1rem",
            right: "1rem",
            position: "absolute",
            color: "#FFF",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {isExportButtonVisible && (
            <Button
              onClick={exports}
              variant="contained"
              sx={{
                backgroundColor: "#505050",
                paddingX: "2rem",
                "&:hover": {
                  backgroundColor: "#1A1F25",
                  color: "#505050",
                },
              }}
            >
              Export
            </Button>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            bottom: "1rem",
            left: "1rem",
            gap: "1rem",
            position: "absolute",
            color: "#FFF",
          }}
        >
          {isScreenShot ? (
            <div style={{ display: "flex", gap: "2rem" }}>
              {!isPrivate &&
                provinceData &&
                provinceData.map((province) => (
                  <StatusTooltip
                    key={province.id}
                    ipx={province.ipx || "مطلوب"}
                    ipxColor={province.ipxColor}
                    igw={province.igw || "مطلوب"}
                    igwColor={province.igwColor}
                    isSecond={true}
                    isScreenShot={isScreenShot}
                  />
                ))}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "1rem" }}>
              <ClickableButton
                onClick={zoomIn}
                text="+"
                disable={scale === 10}
              />
              <ClickableButton
                onClick={zoomOut}
                text="-"
                disable={scale === 1}
              />
            </div>
          )}
        </Box>
      </Box>
      {hoveredProvince && (
        <StatusTooltip
          ipx={
            provinceData?.find((province) => province.name === hoveredProvince)
              ?.ipx || "مطلوب"
          }
          ipxColor={
            provinceData?.find((province) => province.name === hoveredProvince)
              ?.ipxColor
          }
          igw={
            provinceData?.find((province) => province.name === hoveredProvince)
              ?.igw || "مطلوب"
          }
          igwColor={
            provinceData?.find((province) => province.name === hoveredProvince)
              ?.igwColor
          }
          x={tooltipPosition!.x - 80}
          y={tooltipPosition!.y - 165}
        />
      )}
    </>
  );
};

export default Map;
