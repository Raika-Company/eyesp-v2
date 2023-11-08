import {Box, FormControl, MenuItem} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";
import Header from "../../components/ui/Header";
import AverageIcon from "../../assets/images/average-icon.svg";
import ArrowDown from "../../assets/images/arrow-down.svg";
import CircleChart from "../../components/ui/CircularChart";
import TaggedText from "../../components/ui/TaggedText";
import {SelectButton} from "../../components/ui/SelectButton";

const mockChartData = [
  {
    id: 1,
    percentage: 66,
    value: 6,
    title: "میانگین سرعت آپلود",
    unit: "Mbps",
  },
  {
    id: 2,
    percentage: 62,
    value: 13,
    title: "میانگین سرعت دانلود",
    unit: "Mbps",
  },
  {
    id: 3,
    percentage: 46,
    value: 32,
    title: "میانگین پینگ",
    unit: "Ms",
  },
  {
    id: 4,
    percentage: 51,
    value: 5,
    title: "میانگین جیتر",
    unit: "Ms",
  },
];

const mockData = [
  {
    id: 1,
    title: "رتبه‌ بین‌المللی",
    value: 87,
  },
  {
    id: 2,
    title: "تاریخ",
    value: "1402/06/27",
  },
  {
    id: 3,
    title: "رتبه‌ملی",
    value: 1,
  },
  {
    id: 4,
    title: "زمان",
    value: "22:41",
  },
];

const Average = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#2B2E31",
      }}
    >
      <Header
        title="میانگین کلی"
        iconPath={AverageIcon}
        selectTitle="ترتیب بر اساس"
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
            width: "60%",
            justifyContent: "center",
            gap: "6rem",
          }}
        >
          {mockChartData.map((chart) => (
            <CircleChart
              big
              key={chart.id}
              textTitle={chart.title}
              value={chart.value}
              unit={chart.unit}
              finalPercentage={chart.percentage}
              size={150}
              strokeWidth={12}
            />
          ))}
        </Box>
        <Box
          sx={{
            width: "60%",
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
        <img
          src={ArrowDown}
          style={{
            position: "absolute",
            top: "52%",
            transform: "translateY(-50%)",
            left: "1rem",
            width: "13px",
            height: "13px",
          }}
        />
      </FormControl>
    </Box>
  );
};

export default Average;
