import Header from "../../components/ui/Header";
import { SelectChangeEvent } from "@mui/material/Select";
import history from "../../assets/images/history.svg";
import CustomTable from "../../components/ui/CustomTable";
import { useState } from "react";
import { Box, Theme, useMediaQuery } from "@mui/material";
import provinceCompare from "../../../public/data/provinceCompare.json";
const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "هوش مصنوعی"];

const LastDis = () => {
  const [rows, setRows] = useState(provinceCompare);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  // const [visibleRows, setVisibleRows] = useState(6);
  const isXsScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );
  const isMdScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const randomizeRows = (data) => {
    if (data.length <= 2) {
      // If there are 2 or fewer items, return the whole array
      return data;
    }

    // Ensure at least 2 items are selected
    const randomSize = Math.max(Math.floor(Math.random() * data.length), 2);
    return data.slice(0, randomSize);
  };

  // const handleCategory = (event: SelectChangeEvent<unknown>) => {
  //   setCategory(event.target.value as string);
  //   setRows(randomizeRows(provinceCompare));
  // };
  // const handleProvinceChange = (event: SelectChangeEvent<unknown>) => {
  //   setProvince(event.target.value as string);
  //   setRows(randomizeRows(provinceCompare));
  // };
  // const handleISPChange = (event: SelectChangeEvent<unknown>) => {
  //   setSelectedISP(event.target.value as string);
  //   setRows(randomizeRows(provinceCompare));
  // };

  const handleButtonClick = (buttonName: string) => {
    setClickedButton(buttonName);
  };
  return (
    <div style={{ backgroundColor: "#2B2E31", height: "100dvh" }}>
      <Header
        isButton={true}
        clickedButton={clickedButton}
        handleButtonClick={handleButtonClick}
        title="اختلالات فعلی"
        iconPath={history}
        selectTitle="ترتیب بندی براساس:"
        // onClick={toggleDialog}
      ></Header>
      <Box
        sx={{
          overflowX: isMdScreen ? "scroll" : "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box sx={{ width: isXsScreen ? "25em" : isMdScreen ? "60em" : "100%" }}>
          <CustomTable rows={rows} cellHeaders={cellHeaders} isAI={true} />
        </Box>
      </Box>
    </div>
  );
};

export default LastDis;
