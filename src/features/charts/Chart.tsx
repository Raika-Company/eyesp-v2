import React, { useState, useMemo } from "react";
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
  selectedISP: string;
  province: string;
  category: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
}

const generateRandomData = (
  selectedISP: string,
  province: string,
  category: string,
  selectedCity: string
) => {
  const randomFactor =
    selectedISP.length +
    province.length +
    category.length +
    selectedCity.length;
  return Array.from({ length: 7 }, (_, i) => ({
    name: ["فروردین", "اسفند", "بهمن", "دی", "آذر", "آبان", "مهر"][i],
    uv: Math.random() * randomFactor * 10,
  }));
};

const cities = ["سرعت", "پینگ", "جیتر"];

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return <div className="custom-tooltip">{payload[0].value}%</div>;
  }
  return null;
};

const Chart: React.FC<ChartProps> = ({
  title,
  desc,
  selectedISP,
  province,
  category,
}) => {
  const theme = useTheme();
  const location = useLocation();
  const [selectedCity, setSelectedCity] = useState<string>("سرعت");
  const isCurrentTrafficRoute = location.pathname.includes("/current-traffic");
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const chartData = useMemo(
    () => generateRandomData(selectedISP, province, category, selectedCity),
    [selectedISP, province, category, selectedCity]
  );

  const handleCityChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedCity(event.target.value as string);
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
            value={selectedCity}
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
        <AreaChart data={chartData}>
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
