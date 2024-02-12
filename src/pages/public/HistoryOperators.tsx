import { useEffect, useMemo, useState } from "react";
import { Box, Button, Stack, useMediaQuery, Theme } from "@mui/material";
import CustomTable from "../../components/ui/CustomTable";
import provinceCompare from "../../../public/data/provinceCompare.json";
import api from "../../services";

/**
 * Interface for the disruption data structure.
 * @param date The date of the disruption.
 * @param hour The hour of the disruption.
 * @param categoryDis The category of the disruption.
 * @param causeDis The cause of the disruption.
 * @param handle The handling status of the disruption.
 */
interface Disruption {
  date: string;
  hour: string;
  categoryDis: string;
  causeDis: string;
  handle: string;
}

/**
 * Enum for different types of button states.
 * Recent - represents recent disruptions.
 * Current - represents current disruptions.
 */
enum ActiveButtonType {
  Recent = "recent",
  Current = "current",
}

const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "وضعیت"];

// const MemoizedCustomTable = React.memo(CustomTable);
/**
 * The HistoryOperators component.
 * This component is responsible for displaying a table of disruptions
 * and allows toggling between recent and current disruptions.
 */
const HistoryOperators = () => {
  const [activeButton, setActiveButton] = useState<ActiveButtonType>(
    ActiveButtonType.Recent
  );
  const [activeData, setActiveData] = useState<Disruption[]>(provinceCompare);
  useEffect(() => {
    api.history.getAllHistories().then((res) => {
      console.log(res.data);
      // setActiveData(res.data.issues);
    });
  }, []);
  const recentDisruptions = useMemo(
    () => provinceCompare.filter((item) => item.handle === "برطرف شده"),
    [provinceCompare]
  );

  const currentDisruptions = useMemo(
    () => provinceCompare.filter((item) => item.handle === "برطرف نشده"),
    [provinceCompare]
  );

  /**
   * Handles button clicks to toggle between recent and current disruptions.
   * @param type The type of button clicked, determining the data to be displayed.
   */

  const handleButtonClick = (type: ActiveButtonType) => {
    setActiveData(
      type === ActiveButtonType.Recent ? recentDisruptions : currentDisruptions
    );
    setActiveButton(type);
  };

  const isMdScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const isXsScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("xs")
  );

  return (
    <Box
      sx={{
        width: isMdScreen ? "100%" : "76%",
        margin: "0 auto",
        borderRadius: "0.8em",
        marginTop: "2em",
      }}
    >
      <Stack direction="row">
        {Object.values(ActiveButtonType).map((type) => (
          <Button
            key={type}
            sx={{
              ml: "1em",
              borderRadius: "0px",
              borderTopRightRadius: "0.75em",
              borderTopLeftRadius: "0.75em",
              bgcolor: "#232629",
              color: activeButton === type ? "#fff" : "#7A7775",
              boxShadow: "0",
              fontSize: isMdScreen ? "0.9rem" : "1.3125rem",
              "&:hover": {
                color: "#fff",
                bgcolor: "#232629",
                boxShadow: "none",
              },
            }}
            variant="contained"
            onClick={() => handleButtonClick(type)}
          >
            {type === ActiveButtonType.Recent
              ? "اختلال های اخیر"
              : "اختلال های فعلی"}
          </Button>
        ))}
      </Stack>
      <Box
        sx={{
          height: "100dvh",
          borderRadius: "0.8em",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          borderTopRightRadius: "0",
          backgroundColor: "#232629",
          overflowX: "scroll",
        }}
      >
        <Box sx={{ width: isXsScreen ? "25em" : isMdScreen ? "60em" : "100%" }}>
          {/* <MemoizedCustomTable rows={activeData} cellHeaders={cellHeaders} /> */}
          <CustomTable rows={activeData} cellHeaders={cellHeaders} />
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryOperators;
