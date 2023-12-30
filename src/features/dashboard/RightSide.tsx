import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

import NumberValue from "./ـcomponents/NumberValue";
import ChartIcon from "../../assets/images/chart-icon-2.svg";
import WifiIcon from "../../assets/images/wifi.svg";
import BadgedValue from "./ـcomponents/BadgedValue";
import InfoBox from "../../components/ui/InfoBox";
import { useISPState } from "./hooks/useISPState";
import ISPRanking from "./ـcomponents/ISPRanking";

const RightSide = () => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  const ispStateData = useISPState();

  return (
    <Box
      sx={{
        height: "100%",
        alignItems: isSmScreen ? "center" : "end",
        display: "grid",
        gridTemplateColumns:
          isMdScreen && !isSmScreen && !isLgScreen ? "1fr 1fr 1fr" : "1fr",
        gap: isXlgScreen ? "1.5rem" : "1rem",
      }}
    >
      <InfoBox title="پینگ مراکز داده" iconPath={ChartIcon}>
        <Stack
          direction="row"
          sx={{
            marginY: "auto",
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
      <ISPRanking />
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
