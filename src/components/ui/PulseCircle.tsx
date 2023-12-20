import { Box, keyframes } from "@mui/material";
import { FC, useEffect, useState } from "react";

const GREEN_COLOR = "#84D1A3";
const RED_COLOR = "#BA3535";

const pulse = keyframes`
from {
    transform: scale(1);
  }
  to {
    transform: scale(2.5);
  }
`;

interface Props {
  hoveredIsp: string | null;
  tooltipPosition: { x: number; y: number } | null;
  setHoveredIsp: React.Dispatch<
    React.SetStateAction<"tehran" | "alborz" | "ahvaz" | null>
  >;
  setTooltipPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
  isActive: boolean;
  province: "tehran" | "alborz" | "ahvaz";
  internal?: boolean;
}

const PulseCircle: FC<Props> = ({
  hoveredIsp,
  tooltipPosition,
  setHoveredIsp,
  setTooltipPosition,
  isActive,
  province,
  internal = false,
}) => {
  const [color, setColor] = useState(GREEN_COLOR);

  useEffect(() => {
    const interval = setInterval(() => {
      if (color === GREEN_COLOR) setColor(RED_COLOR);
      else setColor(GREEN_COLOR);
    }, 700 + Math.random() * 1000);

    return () => clearInterval(interval);
  });

  return (
    <Box
      onMouseEnter={(e) => {
        e.stopPropagation();
        if (!hoveredIsp || tooltipPosition) {
          setHoveredIsp(province);
          setTooltipPosition({ x: e.pageX, y: e.pageY });
        }
      }}
      onMouseLeave={() => setHoveredIsp(null)}
      sx={{
        borderRadius: "50%",
        transition: "background .2s ease-in-out",
        width: "11px",
        height: "11px",
        background: !isActive && internal ? color : GREEN_COLOR,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          borderRadius: "50%",
          transition: "background .2s ease-in-out",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: !isActive && internal ? color + 30 : GREEN_COLOR + 30,
          animation: `${pulse} 1s ${
            Math.random() * 0.5
          }s infinite alternate linear`,
        },
      }}
    ></Box>
  );
};

export default PulseCircle;
