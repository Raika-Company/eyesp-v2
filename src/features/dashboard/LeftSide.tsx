import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NumberValue from "./components/NumberValue";
import AverageIcon from "../../assets/images/average-icon.svg";
import ArrowLeftGreen from "../../assets/images/arrow-left-green.svg";
import ActiveIndicator from "./components/ActiveIndicator";
import ChartIcon from "../../assets/images/chart-icon.svg";
import {Link} from "react-router-dom";
import InfoBox from "../../components/ui/InfoBox";

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
  // {
  //   id: 3,
  //   name: "رایتل",
  //   isActive: true,
  //   speed: "10",
  // },
  // {
  //   id: 3,
  //   name: "رایتل",
  //   isActive: true,
  //   speed: "10",
  // },
  // {
  //   id: 3,
  //   name: "رایتل",
  //   isActive: true,
  //   speed: "10",
  // },
  // {
  //   id: 3,
  //   name: "رایتل",
  //   isActive: true,
  //   speed: "10",
  // },
  // {
  //   id: 3,
  //   name: "رایتل",
  //   isActive: true,
  //   speed: "10",
  // },
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
    isActive: false,
  },
  {
    id: 3,
    name: "Amazon",
    isActive: false,
  },
];

const LeftSide = () => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  const isMDScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gap: isXlgScreen ? "1.5rem" : "1rem",
        maxWidth: isXlgScreen ? "initial" : "19rem",
        justifySelf: isMDScreen ? "start" : "",
      }}
    >
      <InfoBox title="میانگین کلی" iconPath={AverageIcon}>
        <Stack
          direction="row"
          sx={{
            paddingY: "1rem",
            marginY: "auto",
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
            marginY: "auto",
            padding: "1rem",
            paddingY: "0",
            display: "flex",
            flexDirection: "column",
            gap: isXlgScreen ? ".5rem" : "",
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
            <Button component={Link} to="/isp" sx={{color: "#7FCD9F"}}>
              مشاهده جذئیات بیشتر
            </Button>
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
            marginY: "auto",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: isXlgScreen ? ".5rem" : "",
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
            <Button
              component={Link}
              to="/global-overview"
              sx={{color: "#7FCD9F"}}
            >
              مشاهده جذئیات بیشتر
            </Button>
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
