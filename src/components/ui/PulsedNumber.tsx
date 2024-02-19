import { Typography, keyframes } from "@mui/material";
import { FC } from "react";

/**
 * Keyframes for pulse animation.
 */
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

/**
 * Props for the PulsedNumber component.
 */
interface Props {
  displayValue: number;
  animationDelay: number;
  value: number;
  showNumber: boolean;
}

/**
 * PulsedNumber component to display a pulsating numeric value.
 *
 * The PulsedNumber component is a UI element that displays a pulsating numeric value with optional animation effects.
 *
 * @component
 * @example
 * // Usage of PulsedNumber with required props:
 * <PulsedNumber displayValue={5} animationDelay={0.5} value={10} showNumber={true} />
 *
 * @param {Props} displayValue - The value to be displayed during animation.
 * @param {Props} animationDelay - The delay for animation in seconds.
 * @param {Props} value - The actual numeric value to be displayed.
 * @param {Props} showNumber - Flag to determine whether to show the numeric value.
 * @returns {JSX.Element} - React JSX element representing the PulsedNumber.
 */
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
