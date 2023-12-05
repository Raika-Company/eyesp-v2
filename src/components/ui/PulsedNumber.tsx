import { Typography, keyframes } from "@mui/material";
import { FC } from "react";

const pulse = keyframes`
  0% {
    color: transparent;
  }

  40% {
    color: #9193a8
  }

  50% {
    color: white;
  }

  100% {
    color: #9193a8
  }
`;

interface Props {
  displayValue: number;
  animationDelay: number;
  value: number;
  showNumber: boolean;
}

const PulsedNumber: FC<Props> = ({
  displayValue,
  animationDelay,
  value,
  showNumber,
}) => {
  return (
    <>
      {!showNumber && (
        <Typography
          sx={{
            zIndex: "20",
            animation: `${pulse} .1s ${animationDelay}s both`,
            color: "transparent",
            fontSize: "1.35rem",
            fontWeight: "bold",
          }}
        >
          {displayValue}
        </Typography>
      )}
      {showNumber && (
        <Typography
          sx={{
            zIndex: "20",
            color: displayValue <= value ? "white" : "#9193a8",
            fontSize: "1.35rem",
            fontWeight: "bold",
          }}
        >
          {displayValue}
        </Typography>
      )}
    </>
  );
};

export default PulsedNumber;
