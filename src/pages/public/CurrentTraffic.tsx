import React, { FC, useState, ChangeEvent } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import wifiLogo from "../../assets/images/wifi.svg";
import HeaderOperators from "./HeaderOperators";
import Chart from "../../features/charts/Chart";
import { SelectOperators } from "./SelectOperators";
import { SelectChangeEvent } from "@mui/material/Select";
import citiesData from "../../../public/data/provincesCoords.json";

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

const cities = ["خروجی", "IXP", "IGW"];
const chartsTitle = ["IXP", "IGW"];

const CurrentTraffic: FC<Props> = ({ onClick }) => {
  const [age, setAge] = React.useState("");
  const [city, setCity] = useState<string>("خروجی");
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [selections, setSelections] = useState({
    city: cityNames[0],
    operator: data.operators[0],
    time: data.times[0],
  });

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
          mx: ".5em",
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
            px: "1.1em",
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
      <HeaderOperators
        title="ترافیک فعلی (IXP, IGW)"
        iconPath={wifiLogo}
        selectTitle="فیلتر:"
        onClick={onClick}
      />
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          flexWrap: "wrap",
          bgcolor: "#2B2E31",
          height: "100dvh",
          overflowX: "hidden",
          px: "2em",
        }}
      >
        {renderSelect(cityNames, selections.city, "city")}
        {renderSelect(data.operators, selections.operator, "operator")}
        {renderSelect(data.times, selections.time, "time")}
        <Grid container justifyContent="center" gap={4} mt="4em">
          {chartsTitle.map((cityName) => (
            <Grid item xs={12} md={5} key={cityName}>
              <Chart title={cityName} desc="Graph Live View" />
              <Typography
                sx={{
                  fontSize: isSmScreen ? "3rem" : isMdScreen ? "4rem" : "5rem",
                  textAlign: "center",
                  mt: "0.4em",
                }}
              >
                {cityName === "خروجی" ? "2015GB" : "3436GB"}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <SelectOperators
          labelId="city-select-label"
          id="city-select"
          value={city}
          displayEmpty
          onChange={(event) => setCity(event.target.value as string)}
          sx={{
            px: "1.7em",
            height: "40px",
            bgcolor: "#232629",
            color: "#FFF",
            borderRadius: "0.7em",
            textAlign: "center",
            ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
              {
                paddingRight: "0em",
              },
          }}
        >
          {cities.map((cityName) => (
            <MenuItem key={cityName} value={cityName}>
              {cityName}
            </MenuItem>
          ))}
        </SelectOperators>
      </Box>
    </>
  );
};

export default CurrentTraffic;
