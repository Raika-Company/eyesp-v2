import {
  Box,
  Button as MuiButton,
  SvgIcon,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {FC, Fragment, useState} from "react";
import MapPaths from "../../features/dashboard/components/MapPaths";

type ProvinceCoordsType = {
  [key: string]: {
    name: string;
    x: number;
    y: number;
    size: number;
  };
};

import provinceCoordsData from "../../../public/data/provincesCoords.json";
import {useNavigate} from "react-router-dom";

const provinceCoords = provinceCoordsData as ProvinceCoordsType;

const mockProvinceData = [
  {
    id: 1,
    name: "tehran",
    numberOfIssues: 3,
  },
  {
    id: 2,
    name: "azerbaijan, east",
    numberOfIssues: 1,
  },
  {
    id: 3,
    name: "khorasan, razavi",
    numberOfIssues: 6,
  },
  {
    id: 4,
    name: "fars",
    numberOfIssues: 1,
  },
  {
    id: 5,
    name: "isfahan",
    numberOfIssues: 2,
  },
  {
    id: 6,
    name: "alborz",
    numberOfIssues: 2,
  },
  {
    id: 7,
    name: "khozestan",
    numberOfIssues: 1,
  },
];

const mockProvinceListsForPrivate = {
  tehran: "#BD2626",
  qom: "#B68A19",
  isfahan: "#7FCD9F",
};

const getColor = (value: number) => {
  switch (true) {
    case value <= 4:
      return "#1CC760";
    case value <= 9:
      return "#FFF500";
    case value >= 10:
      return "#FF6B6B";
  }
};

interface Props {
  isPrivate?: boolean;
}

const Map: FC<Props> = ({isPrivate = false}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLgDownScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  interface CircleProps {
    index: number;
  }
  const AnimatedCircle = styled("circle")<
    CircleProps & React.SVGProps<SVGAElement>
  >(({index, cx, cy}) => ({
    animation: `pulse 2s ${188 * index}ms infinite `,
    transformOrigin: `${cx}px ${cy}px`,
    "@keyframes pulse": {
      "0%": {
        transform: "scale(1)",
      },

      "100%": {
        transform: "scale(3)",
        opacity: 0,
      },
    },
  }));

  interface ButtonProps {
    text: string;
    onClick: () => void;
  }
  const Button: FC<ButtonProps> = ({text, onClick}) => {
    return (
      <MuiButton
        onClick={onClick}
        sx={{
          background: "#666",
          color: "#FFF",
          fontSize: "1.2rem",
          border: "none",
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: ".5rem",
          cursor: "pointer",
          ":hover": {
            background: "#66666666",
          },
        }}
      >
        {text}
      </MuiButton>
    );
  };

  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [startPos, setStartPos] = useState({x: 0, y: 0});

  const zoomIn = () => {
    setScale(scale * 1.1); // Increase scale by 10%
  };

  const zoomOut = () => {
    setScale(scale / 1.1); // Decrease scale by 10%
  };

  const startDrag = (e) => {
    if (isPrivate && scale !== 1) {
      setDragging(true);
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const onDrag = (e) => {
    if (isPrivate && scale !== 1) {
      if (dragging) {
        setPosition({
          x: e.clientX - startPos.x,
          y: e.clientY - startPos.y,
        });
      }
    }
  };

  const endDrag = () => {
    if (isPrivate && scale !== 1) {
      setDragging(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        maxHeight: "100%",
        maxWidth: "100%",
      }}
    >
      <SvgIcon
        sx={{
          width: "100%",
          height: "100%",
          boxShadow: "0px 12px 32.13126px 0px rgba(0, 0, 0, 0.50)",
          order: isLgDownScreen ? "-1" : "0",
          gridColumnEnd: !isLgScreen && !isSmScreen ? "span 2" : "span 1",
        }}
      >
        {/* <Link to="/disorders"> */}
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1130 1005"
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
            navigate("/disorders");
          }}
        >
          <MapPaths
            provinceList={isPrivate ? mockProvinceListsForPrivate : {}}
          />
          {!isPrivate &&
            mockProvinceData.map((province, index) => (
              <Fragment key={province.id}>
                <circle
                  key={province.id}
                  cx={provinceCoords[province.name].x}
                  cy={provinceCoords[province.name].y}
                  fill={getColor(province.numberOfIssues)}
                  r="8"
                />
                <AnimatedCircle
                  cx={provinceCoords[province.name].x}
                  cy={provinceCoords[province.name].y}
                  stroke={getColor(province.numberOfIssues)}
                  opacity=".40"
                  index={index}
                  r="8"
                />
                <AnimatedCircle
                  cx={provinceCoords[province.name].x}
                  cy={provinceCoords[province.name].y}
                  stroke={getColor(province.numberOfIssues)}
                  opacity=".30"
                  index={index}
                  r="12"
                />
                <AnimatedCircle
                  cx={provinceCoords[province.name].x}
                  cy={provinceCoords[province.name].y}
                  stroke={getColor(province.numberOfIssues)}
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
        <Button onClick={zoomIn} text="+" />
        <Button onClick={zoomOut} text="-" />
      </Box>
    </Box>
  );
};

export default Map;
