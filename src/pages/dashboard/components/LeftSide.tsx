import {Box, Divider, Stack, Typography} from "@mui/material";
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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <InfoBox title="میانگین کلی" iconPath={AverageIcon}>
        <Stack
          direction="row"
          sx={{
            paddingY: "1.5rem",
            paddingX: ".8rem",
            gap: "1rem",
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
