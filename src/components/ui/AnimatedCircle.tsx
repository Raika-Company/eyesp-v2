import { styled } from "@mui/material";
import React from "react";

interface AnimatedCircleProps extends React.SVGProps<SVGCircleElement> {
  index: number;
}

const PULSE_ANIMATION_DURATION = 2000; // in milliseconds
const PULSE_ANIMATION_DELAY_MULTIPLIER = 188; // adjust this based on your needs

export const AnimatedCircle = styled("circle")<AnimatedCircleProps>(
  ({ index, cx, cy }) => ({
    animation: `pulse ${PULSE_ANIMATION_DURATION}ms ${
      PULSE_ANIMATION_DELAY_MULTIPLIER * index
    }ms infinite`,
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
