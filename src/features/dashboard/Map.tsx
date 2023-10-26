import {SvgIcon, styled} from "@mui/material";
import {FC, Fragment} from "react";
import MapPaths from "./components/MapPaths";
import provinceCoords from "../../../public/data/provincesCoords.json";

const mockProvinceData = [
  {
    id: 1,
    name: "tehran",
    numberOfIssues: 3,
  },
  {
    id: 2,
    name: "yazd",
    numberOfIssues: 4,
  },
  {
    id: 3,
    name: "ardabil",
    numberOfIssues: 6,
  },
  {
    id: 4,
    name: "lorestan",
    numberOfIssues: 8,
  },
  {
    id: 5,
    name: "isfahan",
    numberOfIssues: 11,
  },
  {
    id: 6,
    name: "ilam",
    numberOfIssues: 2,
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
      }}
    >
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
    </SvgIcon>
  );
};

export default Map;
