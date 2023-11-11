import {SvgIcon, styled, useMediaQuery, useTheme} from "@mui/material";
import {FC, Fragment} from "react";
// import MapPaths from "./components/MapPaths";
import MapPaths from "../dashboard/components/MapPaths";

type ProvinceCoordsType = {
  [key: string]: {
    name: string;
    x: number;
    y: number;
    size: number;
  };
};

import provinceCoordsData from "../../../public/data/provincesCoords.json";
import {Link} from "react-router-dom";

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

const Map: FC = () => {
  const theme = useTheme();
  const isLgDownScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  interface Props {
    index: number;
  }
  const AnimatedCircle = styled("circle")<Props & React.SVGProps<SVGAElement>>(
    ({index, cx, cy}) => ({
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
    })
  );

  return (
    <SvgIcon
      sx={{
        width: "100%",
        height: "100%",
        boxShadow: "0px 12px 32.13126px 0px rgba(0, 0, 0, 0.50)",
        order: isLgDownScreen ? "-1" : "0",
        gridColumnEnd: !isLgScreen && !isSmScreen ? "span 2" : "span 1",
      }}
    >
      <Link to="/disorders">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1130 1004"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <MapPaths />
          {mockProvinceData.map((province, index) => (
            <Fragment key={province.id}>
              <circle
                key={province.id}
                cx={(provinceCoords as any)[province.name].x}
                cy={(provinceCoords as any)[province.name].y}
                fill={getColor(province.numberOfIssues)}
                r="8"
              />
              <AnimatedCircle
                cx={(provinceCoords as any)[province.name].x}
                cy={(provinceCoords as any)[province.name].y}
                stroke={getColor(province.numberOfIssues)}
                opacity=".40"
                index={index}
                r="8"
              />
              <AnimatedCircle
                cx={(provinceCoords as any)[province.name].x}
                cy={(provinceCoords as any)[province.name].y}
                stroke={getColor(province.numberOfIssues)}
                opacity=".30"
                index={index}
                r="12"
              />
              <AnimatedCircle
                cx={(provinceCoords as any)[province.name].x}
                cy={(provinceCoords as any)[province.name].y}
                stroke={getColor(province.numberOfIssues)}
                opacity=".2"
                index={index}
                r="16"
              />
            </Fragment>
          ))}
        </svg>
      </Link>
    </SvgIcon>
  );
};

export default Map;
