import { styled } from "@mui/material";
import React from "react";

/**
 * Props interface for the AnimatedCircle component.
 * Extends React's SVGProps<SVGCircleElement> to include additional properties.
 */
interface AnimatedCircleProps extends React.SVGProps<SVGCircleElement> {
  index: number;
}

/**
 * Duration of the pulse animation in milliseconds.
 */
const PULSE_ANIMATION_DURATION = 2000; // in milliseconds

/**
 * Multiplier for the pulse animation delay.
 * Adjust this value based on specific animation needs.
 */
const PULSE_ANIMATION_DELAY_MULTIPLIER = 188; // adjust this based on your needs

/**
 * Styled component for creating an animated circle with a pulse effect.
 * @param {AnimatedCircleProps} props - The props for the AnimatedCircle component.
 * @returns {JSX.Element} - React JSX element representing the animated circle.
 */
export const AnimatedCircle = styled("circle")<AnimatedCircleProps>(
  ({ index, cx, cy }) => ({
    /**
 * Apply pulse animation to the circle.
 * - Uses the pulse keyframes defined below.
 * - Infinite loop for continuous animation.
 */
    animation: `pulse ${PULSE_ANIMATION_DURATION}ms ${PULSE_ANIMATION_DELAY_MULTIPLIER * index
      }ms infinite`,
    /**
* Set the transform origin for the animation.
* This determines the point around which the scaling transformation occurs.
*/
    transformOrigin: `${cx}px ${cy}px`,
    /**
 * Keyframes for the pulse animation.
 */
    "@keyframes pulse": {
      "0%": {
        transform: "scale(1)",
      },
      "100%": {
        transform: "scale(3)",
        opacity: 0, // Disappear at the end of the animation
      },
    },
  })
);
