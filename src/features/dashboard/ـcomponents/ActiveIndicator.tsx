import { FC } from "react";
import { Box, keyframes } from "@mui/material";

/**
 * Props for the ActiveIndicator component.
 */
interface Props {
  /**
 * A boolean indicating whether the indicator is active or not.
 */
  isActive: boolean;
}

/**
 * Animation keyframes for the pulse effct.
 */
const pulse = keyframes`
from {
    transform: scale(1);
  }
  to {
    transform: scale(2.5);
  }
`;

/**
 * ActiveIndicator component displays a circular indicator with a pulse effect,
 * indicating whether it is active or not.
 *
 * @component
 * @param {Props} props - The properties of the ActiveIndicator component.
 * @returns {JSX.Element} The rendered ActiveIndicator component.
 */
const ActiveIndicator: FC<Props> = ({ isActive }) => {
  /**
   * Determine the inner color based on the activity state.
   */
  const innerColor = isActive ? "#84D1A3" : "#BA3535";

  return (
    <Box
      sx={{
        borderRadius: "50%",
        width: "11px",
        height: "11px",
        background: innerColor,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          borderRadius: "50%",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: innerColor + "30",
          animation: `${pulse} ${0.6 * Math.random() + 0.5
            }s infinite alternate linear`,
        },
      }}
    />
  );
};

export default ActiveIndicator;
