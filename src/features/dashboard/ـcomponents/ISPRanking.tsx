import { Dialog, Box } from "@mui/material";
import InfoBox from "../../../components/ui/InfoBox";
import { InternalISPList } from "../LeftSide";
import SpeedCompare from "../../../assets/images/speed-compare.svg";
import { useState } from "react";
import ISPList from "./ISPList";

const ISPRanking = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };
  return (
    <>
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
        <InfoBox
          title="رتبه بندی سرعت"
          iconPath={SpeedCompare}
          hasButton={false}
          onClick={toggleDialog}
        >
          <Box padding=".5rem">
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
