import React, { FC, useState } from "react";
import { Box, Grid, MenuItem, Typography } from "@mui/material";
import wifiLogo from "../../assets/images/wifi.svg";
import HeaderOperators from "./HeaderOperators";
import Chart from "../../features/charts/Chart";
import { SelectOperators } from "./SelectOperators";

interface Props {
  onClick?: () => void;
}

const cities = ["خروجی", "IXP", "IGW"];

const CurrentTraffic: FC<Props> = ({ onClick }) => {
  const [city, setCity] = useState<string>("خروجی");

  return (
    <Box
      sx={{
        flexGrow: 1,
        justifyContent: "center",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <HeaderOperators
        title="ترافیک فعلی (IXP, IGW)"
        iconPath={wifiLogo}
        selectTitle="فیلتر:"
        onClick={onClick}
      />
      <Grid container justifyContent="center" gap={4} mt="4em">
        {cities.map((cityName) => (
          <Grid item xs={12} sm={5} key={cityName}>
            <Chart title={cityName} desc="Graph Live View" />
            <Typography
              sx={{ fontSize: "6.25rem", textAlign: "center", mt: "0.4em" }}
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
          width: "7%",
          height: "40px",
          bgcolor: "#232629",
          color: "#FFF",
          borderRadius: "0.7em",
        }}
      >
        {cities.map((cityName) => (
          <MenuItem key={cityName} value={cityName}>
            {cityName}
          </MenuItem>
        ))}
      </SelectOperators>
    </Box>
  );
};

export default CurrentTraffic;
