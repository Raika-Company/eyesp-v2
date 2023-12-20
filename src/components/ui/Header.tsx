import { FC } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  Button,
  useTheme,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link, useNavigate } from "react-router-dom";
import { SelectButton } from "./SelectButton";
import { HeaderButton } from "./HeaderButton";
import provincesCoords from "../../../public/data/provincesCoords.json";
import ISPData from "../../../public/data/ISPData.json";
import Category from "../../../public/data/category.json";

interface Props {
  title: string;
  selectTitle: string;
  iconPath: string;
  onClick?: () => void;
  handleISPChange?: (event: SelectChangeEvent<string>) => void;
  handleProvinceChange?: (event: SelectChangeEvent<string>) => void;
  handleCategory?: (event: SelectChangeEvent<string>) => void;
  category?: string;
  province?: string;
  selectedISP?: string;
  isButton?: boolean;
  isButtonSelect?: boolean;
  handleButtonClick?: (buttonName: string) => void;
  clickedButton?: string | null;
}

const Header: FC<Props> = ({
  title,
  iconPath,
  selectTitle,
  province,
  selectedISP,
  category,
  handleProvinceChange,
  handleISPChange,
  handleCategory,
  isButton,
  isButtonSelect,
  handleButtonClick,
  clickedButton,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const renderButtons = () => (
    <Box
      sx={{
        display: "flex",
        height: "70px",
        gap: "1rem",
        flexDirection: isSmScreen ? "column" : "row",
        marginTop: isSmScreen ? ".5rem" : "1.8rem",
      }}
    >
      <HeaderButton
        clicked={clickedButton === "province" ? "true" : "false"} // Convert boolean to string
        onClick={() => handleButtonClick?.("province")}
      >
        استان
      </HeaderButton>
      <HeaderButton
        clicked={clickedButton === "operator" ? "true" : "false"} // Convert boolean to string
        onClick={() => handleButtonClick?.("operator")}
      >
        اپراتور
      </HeaderButton>
      <HeaderButton
        clicked={clickedButton === "type" ? "true" : "false"} // Convert boolean to string
        onClick={() => handleButtonClick?.("type")}
      >
        نوع
      </HeaderButton>
    </Box>
  );

  const renderSelects = () => (
    <>
      <SelectControl
        label="انتخاب استان"
        value={province || ""}
        onChange={handleProvinceChange}
        options={getOptions(provincesCoords)}
      />
      <SelectControl
        label="انتخاب اپراتور"
        value={selectedISP || ""}
        onChange={handleISPChange}
        options={ISPData.map((isp) => ({
          value: isp.ISPname,
          label: isp.ISPname,
        }))}
      />
      <SelectControl
        label="نوع"
        value={category || ""}
        onChange={handleCategory}
        options={Category.map((cat) => ({ value: cat.name, label: cat.name }))}
      />
    </>
  );

  return (
    <Box sx={getMainBoxStyle(isMdScreen)}>
      <Box sx={getIconBoxStyle(isMdScreen)}>
        <img alt="Icon" src={iconPath} />
        <Typography color="white" fontSize={isMdScreen ? "1rem" : "1.3rem"}>
          {title}
        </Typography>
      </Box>

      <Box sx={getSelectsBoxStyle(isSmScreen, isMdScreen)}>
        <Typography
          color="#7A7775"
          mr={isSmScreen ? "0" : isMdScreen ? "0.5rem" : "3rem"}
        >
          {selectTitle}
        </Typography>
        <Box sx={getSelectsWrapperStyle(isSmScreen)}>
          {isButton ? renderButtons() : isButtonSelect ? renderSelects() : null}
        </Box>
      </Box>

      <Box sx={getBackButtonBoxStyle(isMdScreen)}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ bgcolor: "transparent", boxShadow: 0, color: "#fff" }}
          endIcon={<KeyboardBackspaceIcon sx={{ mr: "0.4em" }} />}
        >
          بازگشت
        </Button>
      </Box>
    </Box>
  );
};

const getMainBoxStyle = (isMdScreen: boolean) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  paddingTop: isMdScreen ? "1rem" : "0",
  paddingBottom: isMdScreen ? "1rem" : "0",
  justifyContent: "space-between",
  background: "#232629",
  paddingX: "1rem",
});

const getIconBoxStyle = (isMdScreen: boolean) => ({
  display: "flex",
  alignItems: "center",
  order: isMdScreen ? 1 : 0,
  gap: "1rem",
});

const getSelectsBoxStyle = (isSmScreen: boolean, isMdScreen: boolean) => ({
  display: "flex",
  flexDirection: isSmScreen ? "column" : "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 0.5,
  margin: isSmScreen ? "0 auto" : isMdScreen ? "0 auto" : "0",
  order: isMdScreen ? 3 : 1,
  transform: isMdScreen ? "0" : isSmScreen ? "0" : "translateX(17rem)",
});

const getSelectsWrapperStyle = (isSmScreen: boolean) => ({
  display: "flex",
  gap: isSmScreen ? 0 : 2,
  flexWrap: isSmScreen ? "wrap" : "nowrap",
  alignItems: "center",
  justifyContent: "center",
});

const getBackButtonBoxStyle = (isMdScreen: boolean) => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
  order: isMdScreen ? 2 : 2,
});

const getOptions = (data: typeof provincesCoords) =>
  Object.keys(data).map((key) => ({
    value: key,
    label: data[key as keyof typeof provincesCoords].name,
  }));

const SelectControl: FC<{
  label: string;
  value: string;
  onChange?: (event: SelectChangeEvent<string>) => void;
  options: { value: string; label: string }[];
}> = ({ label, value, onChange, options }) => (
  <FormControl sx={{ height: "70px", marginTop: "1.8rem" }}>
    <SelectButton
      labelId={`${label}-label`}
      id={`${label}-select`}
      label={label}
      value={value}
      onChange={(e) => onChange?.(e as SelectChangeEvent<string>)}
      displayEmpty
      sx={{ paddingLeft: "2rem", minWidth: "10rem" }}
    >
      <MenuItem value="">{label}</MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </SelectButton>
  </FormControl>
);

export default Header;
