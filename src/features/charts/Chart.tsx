import React, { useState } from "react";
import {
  Box,
  MenuItem,
  Typography,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { useLocation } from "react-router-dom";
import { SelectButton } from "../../components/ui/SelectButton";

interface DataPoint {
  name: string;
  uv: number;
}

interface ChartProps {
  title: string;
  desc: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
}

const data: DataPoint[] = [
  { name: "فروردین", uv: 80 },
  { name: "اسفند", uv: 30 },
  { name: "بهمن", uv: 50 },
  { name: "دی", uv: 40 },
  { name: "آذر", uv: 90 },
  { name: "آبان", uv: 10 },
  { name: "مهر", uv: 90 },
];

const cities = ["سرعت", "پینگ", "جیتر"];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return <div className="custom-tooltip">{payload[0].value}%</div>;
  }
  return null;
};

const Chart: React.FC<ChartProps> = ({ title, desc }) => {
  const theme = useTheme();
  const location = useLocation();
  const [city, setCity] = useState<string>("سرعت");
  const isCurrentTrafficRoute = location.pathname.includes("/current-traffic");
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCityChange = (event: SelectChangeEvent<unknown>) => {
    setCity(event.target.value as string);
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "1em",
        border: "2.326px solid rgba(255, 255, 255, 0.07)",
        borderRadius: "1em",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isCurrentTrafficRoute ? "flex-end" : "space-between",
          alignItems: "center",
          ml: isCurrentTrafficRoute ? "3.6em" : "",
        }}
      >
        <Typography
          sx={{
            ml: "1em",
            mt: ".5em",
            fontSize: isCurrentTrafficRoute || isSmScreen ? "1.2rem" : "2rem",
          }}
        >
          {desc}
        </Typography>
        <Typography sx={{ fontSize: "3.125rem" }}>{title}</Typography>
        {!isCurrentTrafficRoute && (
          <SelectButton
            labelId="city-select-label"
            id="city-select"
            value={city}
            displayEmpty
            onChange={handleCityChange}
            sx={{
              px: "1.1em",
              ".css-v3zyv7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-v3zyv7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-v3zyv7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                {
                  paddingRight: "0em",
                },
              height: "40px",
              bgcolor: "#232629",
              color: "#FFF",
              borderRadius: "0.7em",
            }}
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </SelectButton>
        )}
      </Box>
      <ResponsiveContainer height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={true} horizontal={false} stroke="#243240" />
          <YAxis tick={{ transform: "translate(-45, 0)" }} />
          {!isCurrentTrafficRoute && <XAxis dataKey="name" />}
          <Tooltip content={<CustomTooltip />} />
          <Area
            strokeWidth={3}
            type="monotone"
            fillOpacity={0.1}
            dataKey="uv"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
