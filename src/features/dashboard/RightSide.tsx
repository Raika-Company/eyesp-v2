import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Dialog,
} from "@mui/material";

import NumberValue from "./ـcomponents/NumberValue";
import SpeedCompare from "../../assets/images/speed-compare.svg";
import ChartIcon from "../../assets/images/chart-icon-2.svg";
import WifiIcon from "../../assets/images/wifi.svg";
import { InternalISPList } from "./LeftSide";
import BadgedValue from "./ـcomponents/BadgedValue";
import { useState } from "react";
import InfoBox from "../../components/ui/InfoBox";
import { useISPState } from "./hooks/useISPState";

interface ISPListDisplayProps {
  isp: typeof InternalISPList;
  isLimited: boolean;
  style?: React.CSSProperties;
}

export const ISPListDisplay: React.FC<ISPListDisplayProps> = ({
  isp,
  isLimited,
  style,
}) => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  const displayIsp = isLimited ? isp.slice(0, 3) : isp;
  const combinedStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    gap: isXlgScreen ? ".5rem" : "",
    marginY: "auto",
    ...style,
  };

  return (
    <Box sx={combinedStyles}>
      {displayIsp.map((isp) => (
        <Box key={isp.id}>
          <Stack
            // temporary
            direction="row-reverse"
            justifyContent="space-between"
            alignItems="center"
            marginX=".5rem"
          >
            {/* temporary */}
            <Stack direction="row-reverse" gap=".5rem">
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

const RightSide = () => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  const [isDialogOpen, setDialogOpen] = useState(false);
  const ispStateData = useISPState();

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: isXlgScreen ? "1.5rem" : "1rem",
        maxWidth: isXlgScreen ? "initial" : "19rem",
      }}
    >
      <InfoBox title="میانگین پینگ مراکز داده" iconPath={ChartIcon}>
        <Stack
          direction="row"
          sx={{
            marginY: "auto",
            paddingX: ".8rem",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NumberValue
            title="داخل"
            value={ispStateData?.ipxAverage || 0}
            unit="ms"
          />
          <NumberValue
            title="خارج"
            value={ispStateData?.igwAverage || 0}
            unit="ms"
          />
        </Stack>
      </InfoBox>
      <InfoBox
        title="رتبه بندی سرعت"
        iconPath={SpeedCompare}
        hasButton={true}
        onClick={toggleDialog}
      >
        <ISPListDisplay
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
            <ISPListDisplay
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

      <InfoBox
        title="ترافیک فعلی (IXP,IGW)"
        iconPath={WifiIcon}
        hasButton={false}
      >
        <Box
          sx={{
            marginY: "auto",
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
