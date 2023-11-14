import React, { FC, useState } from "react";
import {
  Box,
  Grid,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import wifiLogo from "../../assets/images/wifi.svg";
import Chart from "../../features/charts/Chart";
import { SelectChangeEvent } from "@mui/material/Select";
import { SelectButton } from "../../components/ui/SelectButton";
import Header from "../../components/ui/Header";

/**
 * Props definition for the CurrentTraffic component.
 * @property onClick - Optional click handler for any interactive elements.
 */
interface Props {
  onClick?: () => void;
}

const cities = ["خروجی", "IXP", "IGW"];
const chartsTitle = ["IXP", "IGW"];

/**
 * CurrentTraffic Component: Displays the current traffic data with interactive charts.
 * It shows different traffic metrics for selected cities and provides filters for customization.
 *
 * @param props - Props passed to the CurrentTraffic component.
 * @returns The CurrentTraffic component JSX.
 */
const CurrentTraffic: FC<Props> = () => {
  const [city, setCity] = useState<string>("خروجی");
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedISP, setSelectedISP] = useState("");
  const [province, setProvince] = useState("");
  const [category, setCategory] = useState("");

  /**
   * Handles category selection change.
   * @param event - The select change event.
   */
  const handleCategory = (event: SelectChangeEvent<unknown>) => {
    setCategory(event.target.value as string);
  };
  const handleProvinceChange = (event: SelectChangeEvent<unknown>) => {
    setProvince(event.target.value as string);
  };
  const handleISPChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedISP(event.target.value as string);
  };

  return (
    <>
      <Header
        handleISPChange={handleISPChange}
        handleProvinceChange={handleProvinceChange}
        handleCategory={handleCategory}
        category={category}
        province={province}
        selectedISP={selectedISP}
        title="ترافیک فعلی (IXP, IGW)"
        iconPath={wifiLogo}
        selectTitle="فیلتر:"
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
        <Grid container justifyContent="center" gap={4} mt="4em">
          {chartsTitle.map((cityName) => (
            <Grid item xs={12} md={5} key={cityName}>
              <Chart
                selectedISP={selectedISP}
                province={province}
                category={category}
                title={cityName}
                desc="Graph Live View"
              />
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
        <SelectButton
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
            ".css-v3zyv7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-v3zyv7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-v3zyv7-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
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
        </SelectButton>
      </Box>
    </>
  );
};

export default CurrentTraffic;
