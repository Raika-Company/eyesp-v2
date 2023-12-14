import { Box, SvgIcon, useMediaQuery, useTheme } from "@mui/material";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapPaths from "../../features/dashboard/ـcomponents/MapPaths";
import { AnimatedCircle } from "./AnimatedCircle";
import { Button } from "./Button";
import provinceCoordsData from "../../../public/data/provincesCoords.json";
import {
  ProvinceCoordsType,
  getColor,
  getProvinceData,
  mockProvinceListsForPrivate,
} from "../../lib/MapHelpers";

const provinceCoords = provinceCoordsData as ProvinceCoordsType;

interface Props {
  isPrivate?: boolean;
}

const Map: FC<Props> = ({ isPrivate = false }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLgDownScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const [scale, setScale] = useState<number>(1);
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
    setScale(Math.min(scale * 1.1, 10));
  };

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
      }[]
    | null
  >(null);
  useEffect(() => {
    getProvinceData().then((res) => setProvinceData(res));
  }, []);

  provinceData && console.log(provinceCoords["تهران"]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
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
          boxShadow: "0px 12px 32.13126px 0px rgba(0, 0, 0, 0.50)",
        }}
      >
        {/* <Link to="/disorders"> */}
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1140 1110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "relative",
            transform: `scale(${scale})`,
            top: `${position.y}px`,
            left: `${position.x}px`,
            transition: "transform .2s ease",
            cursor: dragging ? "grabbing" : scale !== 1 ? "pointer" : "initial",
          }}
          onMouseDown={startDrag}
          onMouseMove={onDrag}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onClick={() => {
            if (isPrivate) return;
            navigate("/last-disorders");
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
                  key={province.id}
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
              </Fragment>
            ))}
        </svg>
        {/* </Link> */}
      </SvgIcon>
      <Box
        sx={{
          display: isPrivate ? "flex" : "none",
          bottom: "1rem",
          left: "1rem",
          gap: "1rem",
          position: "absolute",
          color: "#FFF",
        }}
      >
        <Button onClick={zoomIn} text="+" disable={scale === 10} />
        <Button onClick={zoomOut} text="-" disable={scale === 1} />
      </Box>
    </Box>
  );
};

export default Map;
