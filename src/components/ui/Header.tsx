import { FC, ReactNode, useState } from "react";
import ArrowLeft from "../../assets/images/arrow-left.svg";
import { Box, FormControl, MenuItem, Typography } from "@mui/material";
import { SelectButton } from "./SelectButton";
import provincesCoords from "../../../public/data/provincesCoords.json";
import ISPData from "../../..//public/data/ISPData.json";
interface Props {
  title: string;
  selectTitle: string;
  iconPath: string;
  // children: ReactNode;
  onClick?: () => void;
}

const Header: FC<Props> = ({ title, iconPath, onClick, selectTitle }) => {
  const [province, setProvince] = useState("");
  const [selectedISP, setSelectedISP] = useState("");
  const [category, setCategory] = useState("نوع");

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };
  const handleISPChange = (event) => {
    setSelectedISP(event.target.value);
  };
  return (
    <Box
      sx={{
        flexGrow: "1",
        // borderRadius: ".5rem",
        boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
        background: "#2B2E31",
        border: "1px solid #2B2E31",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: "#232629",
          borderTopRightRadius: ".5rem",
          borderTopLeftRadius: ".5rem",
          paddingX: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: "1",
            alignItems: "center",
            gap: "1.18rem",
          }}
        >
          <img alt="iconPath" src={iconPath} />
          <Typography color="white">{title}</Typography>
          <Typography color="#7A7775" mr="3rem">
            {selectTitle}
          </Typography>

          <FormControl sx={{ height: "70px", marginTop: "1.8rem" }}>
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
                <MenuItem
                  key={provincesCoords[provinceName]}
                  value={provinceName}
                >
                  {provincesCoords[provinceName].name}
                </MenuItem>
              ))}
            </SelectButton>
          </FormControl>
          <FormControl
            sx={{
              height: "70px",
              marginTop: "1.8rem",
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
          <FormControl sx={{ height: "70px", marginTop: "1.8rem" }}>
            <SelectButton
              labelId="change-province-label"
              id="change-province"
              label=" نوع"
              value={category}
              // value={province}
              // onChange={handleProvinceChange}
              displayEmpty
              sx={{
                paddingLeft: "2rem",
                minWidth: "10rem",
                // background: isDark ? "" : "#FFF",
              }}
            >
              <MenuItem value="نوع">نوع</MenuItem>
            </SelectButton>
          </FormControl>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>بازگشت</Typography>
          <img
            alt="arrowLeft"
            onClick={onClick}
            src={ArrowLeft}
            style={{
              marginLeft: ".5rem",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
