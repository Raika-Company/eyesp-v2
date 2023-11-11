import React, { useState } from "react";
import {
  Box,
  MenuItem,
  Typography,
  SelectChangeEvent,
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
import { SelectOperators } from "../../pages/public/SelectOperators";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const [city, setCity] = useState<string>("سرعت");
  const isCurrentTrafficRoute = location.pathname.includes("/Current-traffic");

  const handleCityChange = (event: SelectChangeEvent<unknown>) => {
    setCity(event.target.value as string);
  };

  return (
    <div
      style={{
        width: "100%",
        height: 310,
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
          sx={{ ml: "1em", mt: ".5em", fontSize: isCurrentTrafficRoute ? ".9rem" : "2rem" }}
        >
          {desc}
        </Typography>
        <Typography sx={{ fontSize: "2rem" }}>{title}</Typography>
        {!isCurrentTrafficRoute && (
          <SelectOperators
            labelId="city-select-label"
            id="city-select"
            value={city}
            displayEmpty
            onChange={handleCityChange}
            sx={{
              width: "12%",
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
          </SelectOperators>
        )}
      </Box>
      <ResponsiveContainer width="100%" height={220}>
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
