import { Box, FormControl, MenuItem } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import Header from "../../components/ui/Header";
import AverageIcon from "../../assets/images/average-icon.svg";
import CircleChart from "../../components/ui/CircularChart";
import TaggedText from "../../components/ui/TaggedText";
import { SelectButton } from "../../components/ui/SelectButton";
import ispData from "../../../public/data/ISPData.json";
import { useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";

interface ChartData {
  id: number;
  percentage: number;
  value: number;
  title: string;
  unit: string;
}

interface MockData {
  id: number;
  title: string;
  value: string;
}

const parseChartData = (data: (typeof ispData)[0]): ChartData[] => [
  {
    id: 1,
    percentage: parseFloat(ispData[0].upload),
    value: parseFloat(ispData[0].performance),
    title: "میانگین سرعت آپلود",
    unit: "Mbps",
  },
  {
    id: 2,
    percentage: parseFloat(ispData[0].speed),
    value: parseFloat(ispData[0].performance),
    title: "میانگین سرعت دانلود",
    unit: "Mbps",
  },
  {
    id: 3,
    percentage: parseFloat(ispData[0].pings),
    value: parseFloat(ispData[0].performance),
    title: "میانگین پینگ",
    unit: "Ms",
  },
  {
    id: 4,
    percentage: parseFloat(ispData[0].packet),
    value: parseFloat(ispData[0].performance),
    title: "میانگین جیتر",
    unit: "Ms",
  },
];

const mockChartData: ChartData[] = parseChartData(ispData[0]);

const mockData: MockData[] = [
  {
    id: 1,
    title: "رتبه‌ بین‌المللی",
    value: ispData[0].disturbance,
  },
  {
    id: 2,
    title: "تاریخ",
    value: "1402/06/27",
  },
  {
    id: 3,
    title: "رتبه‌ملی",
    value: ispData[0].disturbance,
  },
  {
    id: 4,
    title: "زمان",
    value: "22:41",
  },
];

const Average = () => {
  const [selectedISP, setSelectedISP] = useState("");
  const [province, setProvince] = useState("");
  const [category, setCategory] = useState("");

  const handleCategory = (event: SelectChangeEvent<unknown>) => {
    setCategory(event.target.value as string);
  };
  const handleProvinceChange = (event: SelectChangeEvent<unknown>) => {
    setProvince(event.target.value as string);
  };
  const handleISPChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedISP(event.target.value as string);
  };

  const calculateFinalPercentage = (
    selectedISP: string,
    province: string,
    category: String
  ) => {
    return selectedISP.length + province.length + category.length;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#2B2E31",
      }}
    >
      <Header
        // isButton={true}
        // clickedButton={clickedButton}
        // handleButtonClick={handleButtonClick}
        title="میانگین کلی"
        selectTitle="ترتیب بر اساس"
        iconPath={AverageIcon}
        category={category}
        province={province}
        selectedISP={selectedISP}
        handleISPChange={handleISPChange}
        handleProvinceChange={handleProvinceChange}
        handleCategory={handleCategory}
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
              finalPercentage={calculateFinalPercentage(
                selectedISP,
                province,
                category
              )}
              unit={chart.unit}
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
        {/* <img
          src={ArrowDown}
          style={{
            position: "absolute",
            top: "52%",
            transform: "translateY(-50%)",
            left: "1rem",
            width: "13px",
            height: "13px",
          }}
        /> */}
      </FormControl>
    </Box>
  );
};

export default Average;
