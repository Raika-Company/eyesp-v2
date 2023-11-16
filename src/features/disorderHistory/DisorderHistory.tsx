import { Suspense, lazy, useState } from "react";
const Header = lazy(() => import("../../components/ui/Header"));
const CustomTable = lazy(() => import("../../components/ui/CustomTable"));
import history from "../../assets/images/history.svg";
import { Box, Theme, useMediaQuery } from "@mui/material";
import provinceCompare from "../../../public/data/provinceCompare.json";


const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "وضعیت"];
type RowType = (typeof provinceCompare)[0];
const DisorderHistory = () => {
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const [rows, setRows] = useState(provinceCompare);

  const isXsScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );
  const isMdScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const randomizeRows = (data: RowType[]): RowType[] => {
    if (data.length <= 2) {
      return data;
    }
    const randomSize = Math.max(Math.floor(Math.random() * data.length), 2);
    return data.slice(0, randomSize);
  };

  const handleButtonClick = (buttonName: string) => {
    setRows(randomizeRows(provinceCompare));
    setClickedButton(buttonName);
  };
  return (
    <div style={{ backgroundColor: "#2B2E31", height: "100dvh" }}>
      <Suspense fallback={<div>loading</div>}>
        <Header
          clickedButton={clickedButton}
          handleButtonClick={handleButtonClick}
          title="تاریخچه اختلالات"
          iconPath={history}
          selectTitle="ترتیب بندی براساس:"
          isButton={true}
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
          <Box
            sx={{ width: isXsScreen ? "25em" : isMdScreen ? "60em" : "100%" }}
          >
            <CustomTable rows={rows} cellHeaders={cellHeaders} isAI={false} />
          </Box>
        </Box>
      </Suspense>
    </div>
  );
};

export default DisorderHistory;
