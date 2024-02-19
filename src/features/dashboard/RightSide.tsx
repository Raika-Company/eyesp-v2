import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";

import NumberValue from "./ـcomponents/NumberValue";
import ChartIcon from "../../assets/images/chart-icon-2.svg";
import WifiIcon from "../../assets/images/wifi.svg";
import BadgedValue from "./ـcomponents/BadgedValue";
import InfoBox from "../../components/ui/InfoBox";
import { useISPState } from "./hooks/useISPState";
import ISPRanking from "./ـcomponents/ISPRanking";

/**
 * Functional component representing the right side section of the application.
 * 
 * This component includes various information boxes and displays data related to ISP (Internet Service Provider) statistics.
 * It consists of:
 * - Ping data for data centers.
 * - ISP ranking information.
 * - Current traffic details for IXP (Internet Exchange Point) and IGW (Internet Gateway).
 * 
 * @returns {JSX.Element} - The JSX element representing the right side section.
 */
const RightSide: React.FC = () => {
  // Theme and media query hooks
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  // Custom hook for ISP state data
  const ispStateData = useISPState();

  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns:
          isMdScreen && !isSmScreen && !isLgScreen ? "1fr 1fr 1fr" : "1fr",
        gridTemplateRows:
          isMdScreen && !isSmScreen && !isLgScreen ? "1fr" : "1fr 1fr 1fr",
        gap: isXlgScreen ? "1.5rem" : "1rem",
        minWidth: "17rem",
      }}
    >
      {/* InfoBox for Ping Data */}
      <InfoBox title="پینگ مراکز داده" iconPath={ChartIcon}>
        <Stack
          direction="row"
          sx={{
            marginY: "auto",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {/* NumberValue component for internal ping data */}
          <NumberValue
            title="داخل"
            value={ispStateData?.ipxAverage || 0}
            unit="ms"
          />
          {/* NumberValue component for external ping data */}
          <NumberValue
            title="خارج"
            value={ispStateData?.igwAverage || 0}
            unit="ms"
          />
        </Stack>
      </InfoBox>
      {/* ISPRanking component */}
      <ISPRanking />
      {/* InfoBox for Current Traffic */}
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
          {/* BadgedValue component for IGW traffic */}
          <BadgedValue badgeName="IGW" value={1490026} />
          {/* BadgedValue component for IXP traffic */}
          <BadgedValue badgeName="IXP" value={2310026} />
        </Box>
      </InfoBox>
    </Box>
  );
};

export default RightSide;
