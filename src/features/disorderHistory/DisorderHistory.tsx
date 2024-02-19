import React, { useState, useCallback } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import history from "../../assets/images/history.svg";
import provinceCompare from "../../../public/data/provinceCompare.json";
import Header from "../../components/ui/Header";
import DisdorderHistoryTable from "./DisdorderHistoryTable";
// const Header = lazy(() => import("../../components/ui/Header"));
// const CustomTable = lazy(() => import("../../components/ui/CustomTable"));

// Type definition for the headers of each cell in the disorder history table.
const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "وضعیت"];
type RowType = (typeof provinceCompare)[number];

/**
 * DisorderHistory Component: Displays the disorder history table with a customizable header.
 * The table shows information such as date, type of disorder, reason for disorder, and status.
 * Allows users to click on buttons to randomize and refresh the table data.
 *
 * @component
 * @returns {JSX.Element} - The DisorderHistory component JSX.
 */
const DisorderHistory: React.FC = () => {
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const [rows, setRows] = useState<RowType[]>(provinceCompare);
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  /**
 * Randomizes the rows of the disorder history table.
 * @param {RowType[]} data - The original data to be randomized.
 * @returns {RowType[]} - The randomized data.
 */
  const randomizeRows = useCallback((data: RowType[]): RowType[] => {
    if (data.length <= 2) return data;
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
    <div style={{ backgroundColor: "#2B2E31", height: "100dvh" }}>
      <Header
        clickedButton={clickedButton}
        handleButtonSelect={handleButtonClick}
        title="تاریخچه اختلالات"
        iconPath={history}
        isButton={false}
        showButton={false}
      />
      <Box
        sx={{
          overflowX: isMdScreen ? "scroll" : "hidden",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box sx={{ width: isXsScreen ? "25em" : isMdScreen ? "60em" : "100%" }}>
          {/* <CustomTable rows={rows} cellHeaders={cellHeaders} isAI={false} /> */}
          <DisdorderHistoryTable rows={rows} cellHeaders={cellHeaders} />
        </Box>{" "}
      </Box>
    </div>
  );
};

export default DisorderHistory;
