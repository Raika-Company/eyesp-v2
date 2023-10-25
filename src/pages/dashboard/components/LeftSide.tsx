import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InfoBox from "./InfoBox";
import NumberValue from "./NumberValue";
import AverageIcon from "../../../assets/images/average-icon.svg";
import ArrowLeftGreen from "../../../assets/images/arrow-left-green.svg";
import ActiveIndicator from "./ActiveIndicator";
import ChartIcon from "../../../assets/images/chart-icon.svg";

export const InternalISPList = [
  {
    id: 1,
    name: "همراه اول",
    isActive: false,
    speed: "15",
  },
  {
    id: 2,
    name: "ایرانسل",
    isActive: true,
    speed: "12",
  },
  {
    id: 3,
    name: "رایتل",
    isActive: true,
    speed: "10",
  },
];

const ExternalISPList = [
  {
    id: 1,
    name: "Github",
    isActive: false,
  },
  {
    id: 2,
    name: "Google",
    isActive: true,
  },
  {
    id: 3,
    name: "Amazon",
    isActive: true,
  },
];

const LeftSide = () => {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexShrink: "1",
        flexDirection: "column",
        gap: isLgScreen ? "2rem" : "1rem",
        maxWidth: isLgScreen ? "initial" : "19rem",
        justifySelf: "end",
      }}
    >
      <InfoBox title="میانگین کلی" iconPath={AverageIcon}>
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
          <NumberValue title="Upload" value={6} unit="mbps" />
          <NumberValue title="Download" value={12} unit="mbps" />
        </Stack>
      </InfoBox>
      <InfoBox
        title="وضعیت مراکز داده‌داخلی"
        iconPath={ChartIcon}
        hasButton={true}
      >
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          {InternalISPList.map((isp) => (
            <Box key={isp.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                marginX=".5rem"
              >
                <Typography>{isp.name}</Typography>
                <ActiveIndicator isActive={isp.isActive} />
              </Stack>
              <Divider
                style={{
                  background: "#35383B",
                  margin: ".5rem",
                }}
              />
            </Box>
          ))}

          <Stack
            direction="row"
            sx={{
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography color="#7FCD9F">{"مشاهده ۱۵ مورد دیگر..."}</Typography>
            <img
              src={ArrowLeftGreen}
              style={{
                marginLeft: ".5rem",
              }}
            />
          </Stack>
        </Box>
      </InfoBox>
      <InfoBox
        title="وضعیت مراکز داده بین‌الملل"
        iconPath={ChartIcon}
        hasButton={true}
      >
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          {ExternalISPList.map((isp) => (
            <Box key={isp.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                marginX=".5rem"
              >
                <Typography>{isp.name}</Typography>
                <ActiveIndicator isActive={isp.isActive} />
              </Stack>
              <Divider
                style={{
                  background: "#35383B",
                  margin: ".5rem",
                }}
              />
            </Box>
          ))}

          <Stack
            direction="row"
            sx={{
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography color="#7FCD9F">{"مشاهده ۴۵  مورد دیگر..."}</Typography>
            <img
              src={ArrowLeftGreen}
              style={{
                cursor: "pointer",
                marginLeft: ".5rem",
              }}
            />
          </Stack>
        </Box>
      </InfoBox>
    </Box>
  );
};

export default LeftSide;
