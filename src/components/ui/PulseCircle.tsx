import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";

// Define constant colors for the pulse circle
const GREEN_COLOR = "#84D1A3";
const RED_COLOR = "#BA3535";

/**
 * Props interface for the PulseCircle component.
 */
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

/**
 * Functional component representing a pulsating circle.
 *
 * The PulseCircle component displays a circle that pulsates between green and red colors.
 * It changes color based on the isActive and internal props.
 *
 * @component
 * @example
 * // Usage of PulseCircle with required props:
 * <PulseCircle
 *   hoveredIsp={hoveredIsp}
 *   tooltipPosition={tooltipPosition}
 *   setHoveredIsp={setHoveredIsp}
 *   setTooltipPosition={setTooltipPosition}
 *   isActive={true}
 *   province="tehran"
 *   internal={false}
 * />
 *
 * @param {PulseCircleProps} hoveredIsp - The ISP being hovered.
 * @param {PulseCircleProps} tooltipPosition - The position of the tooltip.
 * @param {PulseCircleProps} setHoveredIsp - Function to set the hovered ISP.
 * @param {PulseCircleProps} setTooltipPosition - Function to set the tooltip position.
 * @param {PulseCircleProps} isActive - Indicates whether the pulse circle is active.
 * @param {PulseCircleProps} province - The province associated with the pulse circle.
 * @param {PulseCircleProps} internal - Indicates whether the ISP is internal.
 * @returns {JSX.Element} - React JSX element representing the pulsating circle.
 */
const PulseCircle: FC<Props> = ({
  hoveredIsp,
  tooltipPosition,
  setHoveredIsp,
  setTooltipPosition,
  isActive,
  province,
  internal = false,
}) => {
  // State to manage the color of the pulse circle
  const [color, setColor] = useState(GREEN_COLOR);

  // Effect to create a pulsating animation by alternating between green and red colors
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
          animation: `pulse 1s .2s infinite alternate linear`,
        },
      }}
    ></Box>
  );
};

export default PulseCircle;
