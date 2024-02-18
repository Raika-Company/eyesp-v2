import React, { useState, useCallback } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Header from "../../components/ui/Header";
import CustomTable from "../../components/ui/CustomTable";
import history from "../../assets/images/history.svg";
import provinceCompare from "../../../public/data/provinceCompare.json";

// Type definition for the headers of each cell in the last disorder table.
const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "هوش مصنوعی"];
export interface ProvinceCompare {
  date: string;
  hour: string;
  categoryDis: string;
  causeDis: string;
  handle: string;
}

/**
 * LastDis Component: Displays the last disorder table with a customizable header.
 * The table shows information such as date, type of disorder, reason for disorder, and AI handle.
 * Allows users to click on buttons to randomize and refresh the table data.
 *
 * @component
 * @returns {JSX.Element} - The LastDis component JSX.
 */
const LastDis: React.FC = () => {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [rows, setRows] = useState<ProvinceCompare[]>(provinceCompare);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  /**
 * Randomizes the rows of the last disorder table.
 * @param {ProvinceCompare[]} data - The original data to be randomized.
 * @returns {ProvinceCompare[]} - The randomized data.
 */
  const randomizeRows = useCallback((data: ProvinceCompare[]) => {
    if (data.length <= 2) {
      return data;
    }
    const randomSize = Math.max(Math.floor(Math.random() * data.length), 2);
    return data.slice(0, randomSize);
  }, []);

  /**
 * Handles the click event on the buttons to refresh and randomize the table data.
 * @param {string} buttonName - The name of the button clicked.
 */
  const handleButtonClick = useCallback(
    (buttonName: string) => {
      setRows(randomizeRows(provinceCompare));
      setClickedButton(buttonName);
    },
    [randomizeRows]
  );

  return (
    <div style={{ backgroundColor: "#2B2E31", height: "100vh" }}>
      <Header
        isButton={true}
        clickedButton={clickedButton}
        handleButtonSelect={handleButtonClick}
        title="اختلالات فعلی"
        iconPath={history}
        selectTitle="ترتیب بندی براساس:"
      />
      <Box
        sx={{
          overflowX: isMdScreen ? "scroll" : "hidden",
          "&::-webkit-scrollbar": { display: "none" },
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
