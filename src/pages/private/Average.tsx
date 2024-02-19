import { lazy, useEffect } from "react";
import { useState } from "react";
import { Box, FormControl, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import AverageIcon from "../../assets/images/average-icon.svg";
import { SelectButton } from "../../components/ui/SelectButton";
import ispData from "../../../public/data/ISPData.json";
import api from "../../services";
import { MetricsReturnType } from "../../services/dashboard/metrics";
import convertToEnglishNumbers from "../../utils/convertToEnglishNumbers";

// Lazily imported components for code splitting
const Header = lazy(() => import("../../components/ui/Header"));
const CircleChart = lazy(() => import("../../components/ui/CircularChart"));
const TaggedText = lazy(() => import("../../components/ui/TaggedText"));

// interface ChartData {
//   id: number;
//   percentage: number;
//   value: number;
//   title: string;
//   unit: string;
// }

/**
 * Represents the data structure for the mock information displayed on the page.
 */
interface MockData {
  id: number;
  title: string;
  value: string;
}

// const parseChartData = (/* data: (typeof ispData)[0] */): ChartData[] => [
//   {
//     id: 1,
//     percentage: parseFloat(ispData[0].upload),
//     value: parseFloat(ispData[0].performance),
//     title: "میانگین سرعت آپلود",
//     unit: "Mbps",
//   },
//   {
//     id: 2,
//     percentage: parseFloat(ispData[0].speed),
//     value: parseFloat(ispData[0].performance),
//     title: "میانگین سرعت دانلود",
//     unit: "Mbps",
//   },
//   {
//     id: 3,
//     percentage: parseFloat(ispData[0].pings),
//     value: parseFloat(ispData[0].performance),
//     title: "میانگین پینگ",
//     unit: "Ms",
//   },
//   {
//     id: 4,
//     percentage: parseFloat(ispData[0].packet),
//     value: parseFloat(ispData[0].performance),
//     title: "میانگین جیتر",
//     unit: "Ms",
//   },
// ];

// const mockChartData: ChartData[] = parseChartData(/* ispData[0] */);

const mockData: MockData[] = [
  {
    id: 1,
    title: "رتبه‌ بین‌المللی",
    value: ispData[0].disturbance,
  },
  {
    id: 2,
    title: "تاریخ",
    value: convertToEnglishNumbers(new Date().toLocaleDateString("fa-IR")),
  },
  {
    id: 3,
    title: "رتبه‌ملی",
    value: ispData[0].disturbance,
  },
  {
    id: 4,
    title: "زمان",
    value: convertToEnglishNumbers(
      new Date().toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
  },
];

/**
 * Represents the Average component, which serves as the main page for displaying
 * various visualizations and information related to average network metrics.
 * This component includes lazily loaded visual components such as CircleChart
 * and TaggedText, and interacts with the API to fetch metrics data for display.
 *
 * @component
 */
const Average = () => {
  // const [isp, setIsp] = useState<string | null>(null);
  // const [province, setProvince] = useState<string | null>(null);

  const [category, setCategory] = useState<string | null>(null);

  const handleChangeCategory = (buttonName: string) => {
    setCategory(buttonName);
  };

  const [metricsData, setMetricsData] = useState<MetricsReturnType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    api.metrics.getAllMetrics().then((res) => {
      setMetricsData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#2B2E31",
      }}
    >
      <Header
        isButton={true}
        clickedButton={category}
        handleButtonSelect={handleChangeCategory}
        title="میانگین کلی"
        iconPath={AverageIcon}
        showButton={true}
        selectTitle="ترتیب بندی براساس:"
      />

      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "8rem",
          marginTop: "5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            marginX: "auto",
            width: "70%",
            justifyContent: "center",
            columnGap: "4rem",
            rowGap: "3rem",
          }}
        >
          <CircleChart
            big
            finalPercentage={66}
            size={150}
            textTitle="میانگین سرعت دانلود"
            value={loading ? "--" : metricsData!.downloadAverage}
            unit="Mbps"
            strokeWidth={12}
          />
          <CircleChart
            big
            finalPercentage={40}
            size={150}
            textTitle="میانگین سرعت آپلود"
            value={loading ? "--" : metricsData!.uploadAverage}
            unit="Mbps"
            strokeWidth={12}
          />
          <CircleChart
            big
            finalPercentage={52}
            size={150}
            textTitle="میانگین پینگ"
            value={loading ? "--" : metricsData!.pingAverage}
            unit="Ms"
            strokeWidth={12}
          />
          <CircleChart
            big
            finalPercentage={52}
            size={150}
            textTitle="میانگین جیترi"
            value={loading ? "--" : metricsData!.jitterAverage}
            unit="Ms"
            strokeWidth={12}
          />
        </Box>
        <Box
          sx={{
            width: "70%",
            marginX: "auto",
            marginBottom: "5rem",
            justifyContent: "center",
            display: "flex",
            flexWrap: "wrap",
            columnGap: "10rem",
            rowGap: "5rem",
          }}
        >
          {mockData.map((data) => (
            <TaggedText key={data.id} title={data.title} value={data.value} />
          ))}
        </Box>
      </Box>

      <FormControl
        sx={{
          minWidth: "8rem",
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          width: "8%",
          marginTop: "1.8rem",
          background: "#232629",
          borderRadius: "1.25rem",
        }}
      >
        <SelectButton
          sx={{
            background: "#232629",
            color: "#FFF",
          }}
          IconComponent={ArrowDropDown}
          value="خروجی"
        >
          <MenuItem value="خروجی">خروجی</MenuItem>
        </SelectButton>
      </FormControl>
    </Box>
  );
};

export default Average;
