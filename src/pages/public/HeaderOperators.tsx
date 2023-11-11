import React, { FC, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Typography,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SelectOperators } from "./SelectOperators";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import citiesData from "../../../public/data/provincesCoords.json";

interface Props {
  title: string;
  selectTitle: string;
  iconPath: string;
  children?: React.ReactNode;
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

const HeaderOperators: FC<Props> = ({
  title,
  iconPath,
  children,
  selectTitle,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

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
          width: "7em",
          height: "70px",
          marginTop: "1.8rem",
          display: isMdScreen ? "none" : "flex",
        }}
      >
        <SelectOperators
          labelId={`${labelId}-select-label`}
          id={`${labelId}-select`}
          value={selectedValue}
          displayEmpty
          onChange={handleSelectionChange(labelId)}
          sx={{
            backgroundColor: isWhiteBackground ? "#fff" : "",
            color: "#7A7775",
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
    <Box
      sx={{
        flexGrow: 1,
        background: "#2B2E31",
        border: "1px solid #2B2E31",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#232629",
          borderRadius: ".5rem .5rem 0 0",
          paddingX: "1rem",
          height: "80px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "1.18rem" }}>
          <img alt="Icon" src={iconPath} />
          <Typography color="white">{title}</Typography>
          <Typography
            sx={{
              color: "#7A7775",
              mr: "3em",
              display: isMdScreen ? "none" : "flex",
            }}
          >
            {selectTitle}
          </Typography>
          {renderSelect(cityNames, selections.city, "city")}
          {renderSelect(data.operators, selections.operator, "operator")}
          {renderSelect(data.times, selections.time, "time")}
        </Box>
        <Button
          onClick={() => navigate(-1)}
          variant="contained"
          sx={{ bgcolor: "transparent", boxShadow: 0, color: "#fff" }}
          endIcon={<KeyboardBackspaceIcon sx={{ mr: "0.4em" }} />}
        >
          بازگشت
        </Button>
      </Box>
      <Box sx={{ marginY: "auto" }}>{children}</Box>
    </Box>
  );
};

export default HeaderOperators;
