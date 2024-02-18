import React, { FC } from "react";
import { SvgIcon, styled, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import MapPaths from "../dashboard/ـcomponents/MapPaths";
import provinceCoordsData from "../../../public/data/provincesCoords.json";

/**
 * Type definition for the coordinates of provinces on the map.
 */
type ProvinceCoordsType = {
  [key: string]: {
    name: string;
    x: number;
    y: number;
    size: number;
  };
};

// Type assertion for province coordinates data
const provinceCoords = provinceCoordsData as ProvinceCoordsType;

/**
 * Type definition for the mock data representing provinces and their associated issues.
 */
type MockProvinceData = {
  id: number;
  name: string;
  numberOfIssues: number;
}[];

// Mock data for provinces and their issues
const mockProvinceData: MockProvinceData = [
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

/**
 * Function to determine the color based on the number of issues.
 * @param value - The number of issues for a province.
 * @returns A string representing the color hex code.
 */
const getColor = (value: number): string => {
  if (value <= 4) return "#1CC760";
  if (value <= 9) return "#FFF500";
  return "#FF6B6B";
};

/**
 * Styled component for an animated circle with pulse animation.
 */
const AnimatedCircle = styled("circle")<{ index: number }>((props) => ({
  animation: `pulse 2s ${188 * props.index}ms infinite `,
  transformOrigin: `${props.cx}px ${props.cy}px`,
  "@keyframes pulse": {
    "0%": { transform: "scale(1)" },
    "100%": { transform: "scale(3)", opacity: 0 },
  },
}));

/**
 * Functional React component representing the map with interactive elements.
 * This component renders an SVG map with dynamic circles and animations based on mock data.
 * Utilizes Material-UI components for responsive styling and integrates with the application's routing.
 *
 * @returns {React.FC} A functional React component representing the interactive map.
 */
const Map: FC = () => {
  const theme = useTheme();
  const isLgDownScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

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
            <React.Fragment key={province.id}>
              <circle
                cx={provinceCoords[province.name].x}
                cy={provinceCoords[province.name].y}
                fill={getColor(province.numberOfIssues)}
                r="8"
              />
              {[8, 12, 16].map((radius) => (
                <AnimatedCircle
                  key={radius}
                  cx={provinceCoords[province.name].x}
                  cy={provinceCoords[province.name].y}
                  stroke={getColor(province.numberOfIssues)}
                  opacity={1 - radius / 20}
                  index={index}
                  r={radius}
                />
              ))}
            </React.Fragment>
          ))}
        </svg>
      </Link>
    </SvgIcon>
  );
};

export default Map;
