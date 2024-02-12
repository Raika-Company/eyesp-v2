import React from "react";
import {
  Box,
  MenuItem,
  Typography,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
  CircularProgress,
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
import { ChartReturnType } from "../../services/Chart";

/**
 * Props for the Chart component.
 * @param title The title of the chart.
 * @param desc Description of the chart.
 * @param selectedISP The currently selected ISP.
 * @param province The selected province.
 * @param category The selected category for data representation.
 */
interface ChartProps {
  title: string;
  desc: string;
  selectedISP: string;
  province: string;
  category: string;
  selectedMetric?: string;
  setSelectedMetric?: (value: string) => void;
  chartData?: ChartReturnType | null;
}

/**
 * Props for the CustomTooltip component.
 * @param active Indicates if the tooltip is active.
 * @param payload Data to be shown in the tooltip.
 */
interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
}

/**
 * Generates random data for the chart based on provided parameters.
 * This simulates dynamic data generation based on user selection.
 * The function creates an array of objects, each representing a data point for the chart.
 * Each data point includes a name (representing a month) and a UV value
 * (a simulated numeric value influenced by the length of the input strings).
 *
 * @param selectedISP The selected Internet Service Provider.
 * @param province The selected province.
 * @param category The selected category.
 * @returns An array of data objects for the chart. Each object has a 'name' (string) and a 'uv' (number).
 */

const steps: string[] = ["دانلود", "آپلود", "پینگ", "پکت لاس", "جیتر"];

/**
 * A custom tooltip component for the chart.
 * Displays data when a chart area is hovered.
 * @param props CustomTooltipProps
 * @returns A JSX element or null.
 */
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return <div className="custom-tooltip">{payload[0].value}%</div>;
  }
  return null;
};

/**
 * The main Chart component.
 * Renders a responsive area chart with dynamic data based on selected parameters.
 * @param props ChartProps
 * @returns A JSX element representing the chart.
 */
const Chart: React.FC<ChartProps> = ({
  title,
  desc,
  chartData,
  selectedMetric = "",
  setSelectedMetric = () => {},
}) => {
  const theme = useTheme();
  const location = useLocation();
  const isCurrentTrafficRoute = location.pathname.includes("/current-traffic");
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMetricChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedMetric(event.target.value as string);
  };

  // const filteredData = (): ChartReturnType | null => {
  //   if (!chartData) return null;

  //   // Initialize an object that conforms to the structure of ChartReturnType
  //   let result: Partial<ChartReturnType> = {
  //     id: chartData.id,
  //     data: {
  //       download: [],
  //       upload: [],
  //       ping: [],
  //       packet_loss: [],
  //       jitter: [],
  //     },
  //   };

  //   switch (selectedMetric) {
  //     case "دانلود":
  //       console.log(chartData.data.download);

  //       result.data.download = chartData.data.download;
  //       break;
  //     case "آپلود":
  //       result.data.upload = chartData.data.upload;
  //       break;
  //     case "جیتر":
  //       result.data.jitter = chartData.data.jitter;
  //       break;
  //     case "پینگ":
  //       console.log(chartData.data.ping);

  //       result.data.ping = chartData.data.ping;
  //       break;
  //     case "پکت لاس":
  //       result.data.packet_loss = chartData.data.packet_loss;
  //       break;
  //     default:
  //       console.log(chartData.data.download);
  //       result.data.download = chartData.data.download;
  //       break;
  //   }

  //   return result as ChartReturnType;
  // };
  const metricMapping = {
    دانلود: "download",
    آپلود: "upload",
    پینگ: "ping",
    پکت_لاس: "packet_loss",
    جیتر: "jitter",
  };
  const filteredData = () => {
    if (!chartData || !chartData.data) return [];

    const dataKey =
      metricMapping[
        selectedMetric as "دانلود" | "آپلود" | "پینگ" | "پکت_لاس" | "جیتر"
      ];

    const metricData =
      chartData.data[
        dataKey as "download" | "upload" | "ping" | "packet_loss" | "jitter"
      ];

    if (!metricData) {
      console.warn(
        `No data found for metric: ${selectedMetric} (mapped to key: ${dataKey})`
      );
      return [];
    }

    return metricData;
  };

  const data = filteredData();

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
            displayEmpty
            value={selectedMetric}
            onChange={handleMetricChange}
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
            {steps.map((step) => (
              <MenuItem key={step} value={step}>
                {step}
              </MenuItem>
            ))}
          </SelectButton>
        )}
      </Box>
      {!chartData ? (
        <CircularProgress />
      ) : (
        <ResponsiveContainer height={220}>
          <AreaChart data={data}>
            {" "}
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={true}
              horizontal={false}
              stroke="#243240"
            />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => {
                return value;
              }}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Chart;
