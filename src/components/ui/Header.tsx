import { FC, ReactNode, useState } from "react";
import ArrowLeft from "../../assets/images/arrow-left.svg";
import { Box, FormControl, MenuItem, Typography } from "@mui/material";
import { SelectButton } from "./SelectButton";

interface Props {
  title: string;
  selectTitle: string;
  iconPath: string;
  // children: ReactNode;
  onClick?: () => void;
}

const Header: FC<Props> = ({
  title,
  iconPath,
  // children,
  onClick,
  selectTitle,
}) => {
  const [age, setAge] = useState("در حال حاضر");

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

          <FormControl
            sx={{ width: "8%", height: "70px", marginTop: "1.8rem" }}
          >
            <SelectButton
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="سال"
              //   onChange={handleChangeDailyPercent}
              displayEmpty
            >
              <MenuItem value="در حال حاضر">درحال حاضر</MenuItem>
              <MenuItem value="۳ ساعت پیش">۳ ساعت پیش</MenuItem>
              <MenuItem value="امروز">امروز</MenuItem>
              <MenuItem value="دیروز">دیروز</MenuItem>
              <MenuItem value="هفتگی">هفتگی</MenuItem>
              <MenuItem value="ماهانه">ماهانه</MenuItem>
              <MenuItem value="سالانه">سالانه</MenuItem>
            </SelectButton>
          </FormControl>
          <FormControl
            sx={{
              width: "8%",
              height: "70px",
              marginTop: "1.8rem",
            }}
          >
            <SelectButton
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="سال"
              //   onChange={handleChangeDailyPercent}
              displayEmpty
            >
              <MenuItem value="در حال حاضر">درحال حاضر</MenuItem>
              <MenuItem value="۳ ساعت پیش">۳ ساعت پیش</MenuItem>
              <MenuItem value="امروز">امروز</MenuItem>
              <MenuItem value="دیروز">دیروز</MenuItem>
              <MenuItem value="هفتگی">هفتگی</MenuItem>
              <MenuItem value="ماهانه">ماهانه</MenuItem>
              <MenuItem value="سالانه">سالانه</MenuItem>
            </SelectButton>
          </FormControl>
          <FormControl
            sx={{ width: "8%", height: "70px", marginTop: "1.8rem" }}
          >
            <SelectButton
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="سال"
              //   onChange={handleChangeDailyPercent}
              displayEmpty
            >
              <MenuItem value="در حال حاضر">درحال حاضر</MenuItem>
              <MenuItem value="۳ ساعت پیش">۳ ساعت پیش</MenuItem>
              <MenuItem value="امروز">امروز</MenuItem>
              <MenuItem value="دیروز">دیروز</MenuItem>
              <MenuItem value="هفتگی">هفتگی</MenuItem>
              <MenuItem value="ماهانه">ماهانه</MenuItem>
              <MenuItem value="سالانه">سالانه</MenuItem>
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

      {/* <Box
        sx={{
          marginY: "auto",
        }}
      >
        {children}
      </Box> */}
    </Box>
  );
};

export default Header;
