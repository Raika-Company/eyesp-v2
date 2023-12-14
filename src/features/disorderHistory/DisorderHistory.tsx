import React, { Suspense, lazy, useState, useCallback } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import history from "../../assets/images/history.svg";
import provinceCompare from "../../../public/data/provinceCompare.json";

const Header = lazy(() => import("../../components/ui/Header"));
const CustomTable = lazy(() => import("../../components/ui/CustomTable"));

const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "وضعیت"];
type RowType = (typeof provinceCompare)[number];

const DisorderHistory: React.FC = () => {
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const [rows, setRows] = useState<RowType[]>(provinceCompare);

  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const randomizeRows = useCallback((data: RowType[]): RowType[] => {
    if (data.length <= 2) return data;
    const randomSize = Math.max(Math.floor(Math.random() * data.length), 2);
    return data.slice(0, randomSize);
  }, []);

  const handleButtonClick = useCallback(
    (buttonName: string) => {
      setRows(randomizeRows(provinceCompare));
      setClickedButton(buttonName);
    },
    [randomizeRows]
  );

  return (
    <div style={{ backgroundColor: "#2B2E31", height: "100vh" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Header
          clickedButton={clickedButton}
          handleButtonClick={handleButtonClick}
          title="تاریخچه اختلالات"
          iconPath={history}
          selectTitle=""
          isButton={false}
          isButtonSelect={false}
        />
        <Box
          sx={{
            overflowX: isMdScreen ? "scroll" : "hidden",
            "&::-webkit-scrollbar": { display: "none" },
            width: isXsScreen ? "25em" : isMdScreen ? "60em" : "100%",
          }}
        >
          <CustomTable rows={rows} cellHeaders={cellHeaders} isAI={false} />
        </Box>
      </Suspense>
    </div>
  );
};

export default DisorderHistory;
