import { useState, useEffect, FC, CSSProperties } from "react";
import { Stack, Typography } from "@mui/material";

interface Props {
  textTitle: string;
  value: number | string;
  unit: string;
  finalPercentage?: number;
  strokeWidth?: number;
  size?: number;
  bgColor?: string;
  textColor?: string;
  big?: boolean;
}

const CircleChart: FC<Props> = ({
  textTitle,
  value,
  unit,
  finalPercentage = 0,
  strokeWidth = 10,
  size = 100,
  bgColor = "none",
  textColor = "none",
  big = false,
}) => {
  const radius = calculateRadius(size, strokeWidth);
  const circumference = calculateCircumference(radius);
  const [percentage, setPercentage] = useState(0);
  const offset = calculateOffset(circumference, percentage);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePercentage(setPercentage, finalPercentage);
    }, 20);

    return () => clearInterval(interval);
  }, [finalPercentage]);

  return (
    <Stack alignItems="center" gap={big ? "1rem" : ""}>
      <div style={positionStyle}>
        <svg width={size} height={size}>
          <defs>
            <filter id="soften">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>
          <circle {...circleProps(size, radius, strokeWidth, bgColor)} />
          <circle
            {...animatedCircleProps(
              size,
              radius,
              strokeWidth,
              circumference,
              offset
            )}
          />
        </svg>
        <Typography component="span" sx={textStyle(big, textColor)}>
          {percentage}%
        </Typography>
      </div>
      <Stack>
        <Typography color="#7A7775" whiteSpace="nowrap" sx={titleStyle(big)}>
          {textTitle}
        </Typography>
        <Typography sx={valueStyle(big)}>
          {value}
          {unit}
        </Typography>
      </Stack>
    </Stack>
  );
};

// Helper Functions and Style Constants
const calculateRadius = (size: number, strokeWidth: number): number =>
  (size - strokeWidth) / 2;
const calculateCircumference = (radius: number): number => 2 * Math.PI * radius;
const calculateOffset = (circumference: number, percentage: number): number =>
  circumference - (percentage / 100) * circumference;

const updatePercentage = (
  setPercentage: React.Dispatch<React.SetStateAction<number>>,
  finalPercentage: number
) => {
  setPercentage((prevPercentage) => {
    if (prevPercentage < finalPercentage) return prevPercentage + 1;
    if (prevPercentage > finalPercentage) return prevPercentage - 1;
    return prevPercentage;
  });
};

const positionStyle: CSSProperties = { position: "relative" };
const textStyle = (big: boolean, textColor: string): CSSProperties => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontWeight: 800,
  fontSize: big ? "2.5rem" : ".8rem",
  color: textColor,
  transition: "stroke-dashoffset .6s linear",
});
const titleStyle = (big: boolean): CSSProperties => ({
  fontSize: big ? "1rem" : ".7rem",
});
const valueStyle = (big: boolean): CSSProperties => ({
  textAlign: "center",
  fontSize: big ? "2.2rem" : "1rem",
  fontWeight: "bold",
});

const circleProps = (
  size: number,
  radius: number,
  strokeWidth: number,
  bgColor: string
) => ({
  cx: size / 2,
  cy: size / 2,
  r: radius,
  strokeWidth: strokeWidth - 3,
  stroke: "#232629",
  fill: bgColor,
  filter: "url(#soften)",
});

const animatedCircleProps = (
  size: number,
  radius: number,
  strokeWidth: number,
  circumference: number,
  offset: number
) => ({
  cx: size / 2,
  cy: size / 2,
  r: radius,
  filter: "url(#soften)",
  strokeWidth: strokeWidth,
  stroke: "#7FCD9F",
  fill: "none",
  strokeDasharray: circumference,
  strokeDashoffset: offset,
  transform: `rotate(-90, ${size / 2}, ${size / 2})`,
  style: {
    transition: "stroke-dashoffset .4s linear",
  },
});

export default CircleChart;
