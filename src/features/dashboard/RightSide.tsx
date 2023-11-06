import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import InfoBox from "./components/InfoBox";
import NumberValue from "./components/NumberValue";
// import ArrowLeftGreen from "../../assets/images/arrow-left-green.svg";
import SpeedCompare from "../../assets/images/speed-compare.svg";
import ChartIcon from "../../assets/images/chart-icon-2.svg";
import WifiIcon from "../../assets/images/wifi.svg";
import { InternalISPList } from "./LeftSide";
import BadgedValue from "./components/BadgedValue";
import { useState } from "react";
import { Flag, Info } from "@mui/icons-material";

const RightSide = () => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toogleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };
  interface ISPListDisplayProps {
    isp: typeof InternalISPList;
    isLimited: boolean;
    style?: React.CSSProperties;
  }

  const ISPListDisplay: React.FC<ISPListDisplayProps> = ({
    isp,
    isLimited,
    style,
  }) => {
    const displayIsp = isLimited ? isp.slice(0, 3) : isp;
    const combinedStyles = {
      display: "flex",
      flexDirection: "column",
      gap: isXlgScreen ? ".5rem" : "",
      ...style,
    };
    return (
      <Box sx={combinedStyles}>
        {displayIsp.map((isp) => (
          <Box key={isp.id}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              marginX=".5rem"
            >
              <Stack direction="row" gap=".5rem">
                <Typography color="#7A7775">#{isp.id}</Typography>
                <Typography>{isp.name}</Typography>
              </Stack>
              <Typography color="#7A7775">{isp.speed}Mbps</Typography>
            </Stack>
            <Divider
              style={{
                background: "#35383B",
                margin: ".5rem",
              }}
            />
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gap: isXlgScreen ? "1.5rem" : "1rem",
        maxWidth: isXlgScreen ? "initial" : "19rem",
      }}
    >
      <InfoBox title="میانگین پینگ مراکز داده" iconPath={ChartIcon}>
        <Stack
          direction="row"
          sx={{
            paddingY: "1rem",
            paddingX: ".8rem",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NumberValue title="داخل" value={31} unit="ms" />
          <NumberValue title="خارج" value={55} unit="ms" />
        </Stack>
      </InfoBox>
      <InfoBox
        title="رتبه بندی سرعت"
        iconPath={SpeedCompare}
        hasButton={true}
        onClick={toogleDialog}
      >
        <ISPListDisplay isp={InternalISPList} isLimited={true} />
      </InfoBox>
      <Dialog
        PaperProps={{ sx: { borderRadius: "0.5rem" } }}
        open={isDialogOpen}
        onClose={toogleDialog}
      >
        <InfoBox
          title="رتبه بندی سرعت"
          iconPath={SpeedCompare}
          hasButton={false}
          onClick={toogleDialog}
        >
          <ISPListDisplay
            isp={InternalISPList}
            isLimited={false}
            style={{
              maxHeight: "40vh",
              overflowY: "scroll",
              width: "20vw",
              padding: "2rem",
            }}
          />
        </InfoBox>
      </Dialog>

      <InfoBox
        title="ترافیک فعلی (IXP,IGW)"
        iconPath={WifiIcon}
        hasButton={true}
      >
        <Box
          sx={{
            padding: "1rem",
            paddingBottom: "0",
            display: "flex",
            flexDirection: "column",
            gap: isXlgScreen ? ".5rem" : "",
          }}
        >
          <BadgedValue badgeName="IGW" value={1490026} />
          <BadgedValue badgeName="IXP" value={2310026} />
        </Box>
      </InfoBox>
    </Box>
  );
};

export default RightSide;
