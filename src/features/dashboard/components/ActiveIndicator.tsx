import {FC} from "react";
import {Box, keyframes} from "@mui/material";

interface Props {
  isActive: boolean;
}

const pulse = keyframes`
from {
    transform: scale(1);
  }
  to {
    transform: scale(2.5);
  }
`;

const ActiveIndicator: FC<Props> = ({isActive}) => {
  const innerColor = isActive ? "#BA3535" : "#84D1A3";

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
          animation: `${pulse} ${
            0.6 * Math.random() + 0.5
          }s infinite alternate linear`,
        },
      }}
    />
  );
};

export default ActiveIndicator;
