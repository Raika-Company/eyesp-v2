import { Dialog, Box } from "@mui/material";
import InfoBox from "../../../components/ui/InfoBox";
import { InternalISPList } from "../LeftSide";
import SpeedCompare from "../../../assets/images/speed-compare.svg";
import { useState } from "react";
import ISPList from "./ISPList";

/**
 * ISPRanking component displays a ranking of ISPs' speeds.
 * It includes an InfoBox with a button that opens a dialog containing ISP rankings.
 *
 * @component
 * @returns {JSX.Element} The rendered ISPRanking component.
 */
const ISPRanking = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  /**
   * Function to toggle the open/close state of the dialog.
   */
  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };
  return (
    <>
      {/* InfoBox displaying ISP rankings with a button to open the dialog */}
      <InfoBox
        title="رتبه بندی سرعت"
        iconPath={SpeedCompare}
        hasButton={true}
        onClick={toggleDialog}
      >
        <ISPList
          style={{ direction: "ltr" }}
          isp={InternalISPList}
          isLimited={true}
        />
      </InfoBox>
      {/* Dialog displaying detailed ISP rankings */}
      <Dialog
        PaperProps={{
          sx: {
            borderRadius: "0.5rem",
            backgroundColor: "transparent",
          },
        }}
        open={isDialogOpen}
        onClose={toggleDialog}
      >
        {/* InfoBox within the dialog, displaying ISP rankings without a button */}
        <InfoBox
          title="رتبه بندی سرعت"
          iconPath={SpeedCompare}
          hasButton={false}
          onClick={toggleDialog}
        >
          <Box>
            {/* ISPList component within the dialog, displaying detailed ISP rankings */}
            <ISPList
              isp={InternalISPList}
              isLimited={false}
              style={{
                direction: "ltr",
                maxHeight: "40dvh",
                overflowY: "scroll",
                width: "20vw",
                padding: "1rem",
              }}
            />
          </Box>
        </InfoBox>
      </Dialog>
    </>
  );
};

export default ISPRanking;
