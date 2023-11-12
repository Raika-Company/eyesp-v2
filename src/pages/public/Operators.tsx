import React, { FC, useState, ChangeEvent } from "react";
import operators from "../../assets/images/operators-icon.svg";
import HeaderOperators from "./HeaderOperators";
import {
  Box,
  FormControl,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import irancell from "../../assets/images/irancell.svg";
import Chart from "../../features/charts/Chart";
import HistoryOperators from "./HistoryOperators";
import { SelectOperators } from "./SelectOperators";
import citiesData from "../../../public/data/provincesCoords.json";
import { SelectChangeEvent } from "@mui/material/Select";
import Header from "../../components/ui/Header";
import provinceCompare from "../../../public/data/provinceCompare.json";
interface InfoItemProps {
  title: string;
  value: string;
}

interface Props {
  onClick?: () => void;
}

const cityNames = Object.values(citiesData).map((city) => city.name);

const data = {
  operators: [
    "همراه اول",
    "ایرانسل",
    "مخابرات",
    "سامانتل",
    "شاتل",
    "زیتل",
    "پارس وب",
  ],
  times: ["نوع", "۳ ساعت پیش", "امروز", "دیروز", "هفتگی", "ماهانه", "سالانه"],
};

const commonStyles = {
  title: {
    textAlign: "center" as const, // Fix for TypeScript
  },
  infoValue: {
    color: "#7A7775",
    fontSize: "0.9375rem",
  },
  mainInfo: {
    color: "#fff",
    fontSize: "1.8rem",
    fontWeight: "700",
  },
} as const; // Ensure immutability and better type inference

const Operators: React.FC = () => {
  const theme = useTheme();
  const [province, setProvince] = useState("");
  const [selectedISP, setSelectedISP] = useState("");
  const [category, setCategory] = useState("");
  const [rows, setRows] = useState(provinceCompare);
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selections, setSelections] = useState({
    city: cityNames[0],
    operator: data.operators[0],
    time: data.times[0],
  });

  const handleCategory = (event: SelectChangeEvent<unknown>) => {
    setCategory(event.target.value as string);
  };
  const handleProvinceChange = (event: SelectChangeEvent<unknown>) => {
    setProvince(event.target.value as string);
  };
  const handleISPChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedISP(event.target.value as string);
  };
  const InfoItem: React.FC<InfoItemProps> = ({ title, value }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: isMdScreen ? "space-between" : "flex-start",
      }}
    >
      <Typography
        sx={{ fontSize: "1.3rem", color: "#7A7775", display: "flex" }}
      >
        {title}:{" "}
      </Typography>
      <Typography component="span" sx={{ fontSize: "1.3rem", color: "#fff" }}>
        {value}
      </Typography>
    </Box>
  );

  const handleSelectionChange =
    (name: keyof typeof selections) => (event: SelectChangeEvent<unknown>) => {
      const value = event.target.value;
      if (typeof value === "string") {
        setSelections((prev) => ({ ...prev, [name]: value }));
      } else {
        console.error("Value is not a string:", value);
      }
    };

  const renderSelect = (
    items: string[],
    selectedValue: string,
    labelId: keyof typeof selections
  ) => {
    const isWhiteBackground = ["city", "operator"].includes(labelId);

    return (
      <FormControl
        sx={{
          height: "70px",
          marginTop: "1.8rem",
          display: isMdScreen ? "flex" : "none",
        }}
      >
        <SelectOperators
          labelId={`${labelId}-select-label`}
          id={`${labelId}-select`}
          value={selectedValue}
          displayEmpty
          onChange={handleSelectionChange(labelId)}
          sx={{
            backgroundColor: isWhiteBackground ? "#fff" : "#232629",
            color: "#7A7775",
            px: isSmScreen ? ".9em" : "2em",
            mx: isSmScreen ? "" : "2em",
            ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
              {
                paddingRight: ".5em",
              },
          }}
        >
          {items.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </SelectOperators>
      </FormControl>
    );
  };
  return (
    <>
      {/* <HeaderOperators
        title="اپراتور ها"
        iconPath={operators}
        selectTitle="فیلتر:"
      /> */}
      <Header
        handleISPChange={handleISPChange}
        handleProvinceChange={handleProvinceChange}
        handleCategory={handleCategory}
        category={category}
        province={province}
        selectedISP={selectedISP}
        title="اپراتور ها"
        iconPath={operators}
        selectTitle="فیلتر:"
      />
      <Box
        sx={{
          bgcolor: "#2B2E31",
          overflowX: "hidden",
          height: "100vh",
        }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          gap={isMdScreen ? 2 : 4}
          mt="2em"
          px="1em"
        >
          {renderSelect(cityNames, selections.city, "city")}
          {renderSelect(data.operators, selections.operator, "operator")}
          {renderSelect(data.times, selections.time, "time")}
          <Box
            sx={{
              width: isSmScreen ? "100%" : isMdScreen ? "90%" : "10%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: isMdScreen ? "space-between" : "center",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography sx={commonStyles.infoValue}>اپراتور</Typography>
              <Typography sx={commonStyles.mainInfo}>ایرانسل</Typography>
            </Box>
            <img src={irancell} alt="operator-logo" />
          </Box>
          <Box width={800}>
            <Chart title="" desc="نمودار وضعیت" />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width={isMdScreen ? "90%" : "20%"}
          >
            <InfoItem title="سرعت دانلود" value="18Mbps" />
            <InfoItem title="سرعت دانلود" value="18Mbps" />
            <InfoItem title="سرعت آپلود" value="18Mbps" />
            <InfoItem title="پینگ" value="40ms" />
            <InfoItem title="جیتر" value="7ms" />
            <InfoItem title="رتبه کشوری" value="2" />
            <InfoItem title="رتبه جهانی" value="90" />
          </Box>
          <HistoryOperators />
        </Box>
      </Box>
    </>
  );
};

export default Operators;
