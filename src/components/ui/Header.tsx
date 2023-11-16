import { FC } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  Theme,
  Button,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { SelectButton } from "./SelectButton";
import { HeaderButton } from "./HeaderButton";
import provincesCoords from "../../../public/data/provincesCoords.json";
import ISPData from "../../..//public/data/ISPData.json";
import Category from "../../../public/data/category.json";

interface Props {
  title: string;
  selectTitle: string;
  iconPath: string;
  // children: ReactNode;
  onClick?: () => void;
  handleISPChange?: (event: SelectChangeEvent<unknown>) => void;
  handleProvinceChange?: (event: SelectChangeEvent<unknown>) => void;
  handleCategory?: (event: SelectChangeEvent<unknown>) => void;
  category?: string;
  province?: string;
  selectedISP?: string;
  isButton?: boolean;
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
  handleButtonClick,
  clickedButton,
}) => {
  const navigate = useNavigate();

  const isSmScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isMdScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: isMdScreen ? "2rem" : "0",
        justifyContent: "space-between",
        background: "#232629",
        paddingX: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          order: isMdScreen ? 1 : 0,
          gap: "1rem",
        }}
      >
        <img alt="iconPath" src={iconPath} />
        <Typography color="white" fontSize={isMdScreen ? "1rem" : "1.3rem"}>
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isSmScreen ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 0.5,
          margin: isSmScreen ? "0 auto" : isMdScreen ? "0 auto" : "0",
          // marginLeft: isSmScreen ? "1px" : isMdScreen ? "7rem" : "35rem",
          order: isMdScreen ? 3 : 1,
          transform: isMdScreen ? "0" : isSmScreen ? "0" : "translateX(17rem)",
        }}
      >
        <Typography
          color="#7A7775"
          mr={isSmScreen ? "0" : isMdScreen ? "0.5rem" : "3rem"}
        >
          {selectTitle}
        </Typography>
        <Box
          display="flex"
          gap={isSmScreen ? 0 : 2}
          flexWrap={isSmScreen ? "wrap" : "nowrap"}
          alignItems="center"
          justifyContent="center"
        >
          {isButton === true ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  height: "70px",
                  gap: "1rem",
                  marginTop: isSmScreen ? ".5rem" : "1.8rem",
                }}
              >
                {" "}
                <HeaderButton
                  clicked={clickedButton === "province"}
                  onClick={() =>
                    handleButtonClick ? handleButtonClick("province") : null
                  }
                >
                  استان
                </HeaderButton>
                <HeaderButton
                  clicked={clickedButton === "operator"}
                  onClick={() =>
                    handleButtonClick ? handleButtonClick("operator") : null
                  }
                >
                  اپراتور
                </HeaderButton>
                <HeaderButton
                  clicked={clickedButton === "type"}
                  onClick={() =>
                    handleButtonClick ? handleButtonClick("type") : null
                  }
                >
                  نوع
                </HeaderButton>
              </Box>
            </>
          ) : (
            <>
              <FormControl
                sx={{
                  height: "70px",
                  marginTop: isSmScreen ? ".5rem" : "1.8rem",
                }}
              >
                <SelectButton
                  labelId="change-province-label"
                  id="change-province"
                  label="انتخاب استان"
                  value={province}
                  onChange={handleProvinceChange}
                  displayEmpty
                  sx={{
                    paddingLeft: "2rem",
                    minWidth: "10rem",
                    // background: isDark ? "" : "#FFF",
                  }}
                >
                  <MenuItem value=""> استان</MenuItem>
                  {Object.keys(provincesCoords).map((provinceName) => (
                    <MenuItem key={provinceName} value={provinceName}>
                      {
                        provincesCoords[
                          provinceName as keyof typeof provincesCoords
                        ].name
                      }
                    </MenuItem>
                  ))}
                </SelectButton>
              </FormControl>
              <FormControl
                sx={{
                  height: "70px",
                  marginTop: isSmScreen ? "0" : "1.8rem",
                }}
              >
                <SelectButton
                  labelId="change-province-label"
                  id="change-province"
                  label="انتخاب اپراتور"
                  value={selectedISP}
                  onChange={handleISPChange}
                  displayEmpty
                  sx={{
                    paddingLeft: "2rem",
                    minWidth: "10rem",
                    // background: isDark ? "" : "#FFF",
                  }}
                >
                  <MenuItem value=""> اپراتور</MenuItem>
                  {ISPData.map((isp) => (
                    <MenuItem key={isp.ISPname} value={isp.ISPname}>
                      {isp.ISPname}
                    </MenuItem>
                  ))}
                </SelectButton>
              </FormControl>
              <FormControl
                sx={{ height: "70px", marginTop: isSmScreen ? "0" : "1.8rem" }}
              >
                <SelectButton
                  labelId="change-category-label"
                  id="change-category-select"
                  label=""
                  value={category}
                  onChange={handleCategory}
                  displayEmpty
                  sx={{
                    paddingLeft: "2rem",
                    minWidth: "10rem",
                    // background: isDark ? "" : "#FFF",
                  }}
                >
                  <MenuItem value=""> نوع</MenuItem>
                  {Category.map((item) => (
                    <MenuItem key={item.name} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </SelectButton>
              </FormControl>{" "}
            </>
          )}{" "}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          order: isMdScreen ? 2 : 2,
        }}
      >
        <Button
          onClick={() => navigate(-1)}
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

export default Header;
// <Box
//     sx={{
//       // flexGrow: "1",
//       // borderRadius: ".5rem",
//       boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
//       background: "#2B2E31",
//       border: "1px solid #2B2E31",
//       display: "flex",
//       flexDirection: "column",
//     }}
//   ></Box>
// <Box
//   sx={{
//     display: "flex",
//     alignItems: "center",
//     gap: 2,
//     order: isMdScreen ? 2 : 2,
//   }}
// >
//   <Typography>بازگشت</Typography>
//   <img
//     alt="arrowLeft"
//     onClick={onClick}
//     src={ArrowLeft}
//     style={{
//       marginLeft: ".5rem",
//       cursor: "pointer",
//     }}
//   />
// </Box>;
