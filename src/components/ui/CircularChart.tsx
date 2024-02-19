import { useState, useEffect, FC, CSSProperties } from "react";
import { Stack, Typography } from "@mui/material";

/**
 * Props interface for the CircleChart component.
 */
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

/**
 * Functional component representing a circular chart with animated progress.
 *
 * The CircleChart component displays a circular chart with animated progress, along with associated text and values.
 *
 * @component
 * @example
 * // Usage of CircleChart with required props:
 * <CircleChart
 *   textTitle="Completion"
 *   value={75}
 *   unit="%"
 *   finalPercentage={75}
 *   strokeWidth={10}
 *   size={100}
 *   bgColor="#F0F0F0"
 *   textColor="#333333"
 *   big={false}
 * />
 *
 * @param {CircleChartProps} textTitle - The title of the chart.
 * @param {CircleChartProps} value - The numeric or string value to be displayed.
 * @param {CircleChartProps} unit - The unit of measurement for the value.
 * @param {CircleChartProps} finalPercentage - The final percentage of completion (default is 0).
 * @param {CircleChartProps} strokeWidth - The width of the circle's stroke (default is 10).
 * @param {CircleChartProps} size - The size of the circle (diameter) in pixels (default is 100).
 * @param {CircleChartProps} bgColor - The background color of the circle (default is "none").
 * @param {CircleChartProps} textColor - The color of the text (default is "none").
 * @param {CircleChartProps} big - Indicates whether to use larger font and spacing (default is false).
 * @returns {JSX.Element} - React JSX element representing the CircleChart.
 */
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
// Function to calculate the radius of the circle
const calculateRadius = (size: number, strokeWidth: number): number =>
  (size - strokeWidth) / 2;

// Function to calculate the circumference of the circle
const calculateCircumference = (radius: number): number => 2 * Math.PI * radius;

// Function to calculate the stroke offset based on percentage
const calculateOffset = (circumference: number, percentage: number): number =>
  circumference - (percentage / 100) * circumference;

// Function to update the percentage with animation
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

// Style Constants
const positionStyle: CSSProperties = { position: "relative" };

// Function to get text style based on big and textColor props
const textStyle = (big: boolean, textColor: string): CSSProperties => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontWeight: 800,
  fontSize: big ? "2.5rem !important" : ".8rem !important",
  color: textColor,
  transition: "stroke-dashoffset .6s linear",
});

// Function to get title style based on big prop
const titleStyle = (big: boolean): CSSProperties => ({
  fontSize: big ? "1rem !important" : ".7rem !important",
});

// Function to get value style based on big prop
const valueStyle = (big: boolean): CSSProperties => ({
  textAlign: "center",
  fontSize: big ? "2.2rem !important" : ".8rem !important",
  fontWeight: "bold",
});

// Function to get properties for the background circle
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

// Function to get properties for the animated progress circle
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
