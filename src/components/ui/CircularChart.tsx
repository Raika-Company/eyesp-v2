import {Stack, Typography} from "@mui/material";
import {useState, useEffect, FC} from "react";

interface Props {
  textTitle: string;
  value: number;
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
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [percentage, setPercentage] = useState(0);
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => {
        if (prevPercentage < finalPercentage) {
          return prevPercentage + 1;
        } else if (prevPercentage > finalPercentage) {
          return prevPercentage - 1;
        } else {
          clearInterval(interval);
          return prevPercentage;
        }
      });
    }, 20);

    return () => clearInterval(interval);
  }, [finalPercentage]);
  return (
    <Stack alignItems="center" gap={big ? "1rem" : ""}>
      <div
        style={{
          position: "relative",
        }}
      >
        <svg width={size} height={size}>
          <defs>
            <filter id="soften">
              <feGaussianBlur stdDeviation="0.5" />
            </filter>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth - 3}
            stroke="#232629"
            fill={bgColor}
            filter="url(#soften)"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            filter="url(#soften)"
            strokeWidth={strokeWidth}
            stroke="#7FCD9F"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90, ${size / 2}, ${size / 2})`}
            style={{
              transition: "stroke-dashoffset .05s linear",
            }}
          />
        </svg>
        <Typography
          color={textColor}
          component="span"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "800",
            fontSize: big ? "2.5rem" : "1.4rem",
            color: "#7FCD9F",
          }}
        >
          {percentage}%
        </Typography>
      </div>

      <Stack>
        <Typography
          color="#7A7775"
          sx={{
            fontSize: big ? "1rem" : ".7rem",
          }}
        >
          {textTitle}
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: big ? "2.2rem" : "1rem",
            fontWeight: "bold",
          }}
        >
          {value}
          {unit}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CircleChart;
