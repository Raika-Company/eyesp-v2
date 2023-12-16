import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NumberValue from "./ـcomponents/NumberValue";
import AverageIcon from "../../assets/images/average-icon.svg";
import ArrowLeftGreen from "../../assets/images/arrow-left-green.svg";
import ActiveIndicator from "./ـcomponents/ActiveIndicator";
import ChartIcon from "../../assets/images/chart-icon.svg";
import { Link } from "react-router-dom";
import InfoBox from "../../components/ui/InfoBox";
import { useISPState } from "./hooks/useISPState";

interface ISP {
  id: number;
  name: string;
  province?: string;
  isActive: boolean;
  speed?: string; // Include if speed is a property for any of the ISPs
}

interface ISPSectionProps {
  title: string;
  ispList: ISP[];
  ispStatus?: {
    [x: string]: {
      isActive: boolean;
    };
  } | null;
  link: string;
  isXlgScreen: boolean;
  hasMoreInfo?: boolean;
}

export const InternalISPList = [
  {
    id: 1,
    name: "زیرساخت - کرج",
    province: "alborz",
    isActive: false,
    speed: "6200",
  },
  {
    id: 2,
    name: "زیر ساخت - اهواز",
    province: "ahvaz",
    isActive: true,
    speed: "4362",
  },
  {
    id: 3,
    name: "فن آوا - تهران",
    province: "tehran",
    isActive: true,
    speed: "862",
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

const ISPSection: React.FC<ISPSectionProps> = ({
  title,
  ispList,
  ispStatus,
  link,
  isXlgScreen,
  hasMoreInfo,
}) => (
  <InfoBox title={title} iconPath={ChartIcon} hasButton={true}>
    <Box
      sx={{
        marginY: "auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: isXlgScreen ? ".5rem" : "",
      }}
    >
      {ispList.map((isp) => (
        <Box key={isp.id}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginX=".5rem"
          >
            <Typography>{isp.name}</Typography>
            <ActiveIndicator
              isActive={
                ispStatus
                  ? ispStatus
                    ? ispStatus[isp.province!].isActive
                    : true
                  : true
              }
            />
          </Stack>
          <Divider
            style={{
              background: "#35383B",
              margin: ".5rem",
            }}
          />
        </Box>
      ))}

      {hasMoreInfo && (
        <Stack
          direction="row"
          sx={{
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button component={Link} to={link} sx={{ color: "#7FCD9F" }}>
            مشاهده جذئیات بیشتر
          </Button>
          <img
            src={ArrowLeftGreen}
            style={{
              cursor: "pointer",
              marginLeft: ".5rem",
            }}
            alt="Arrow icon"
          />
        </Stack>
      )}
    </Box>
  </InfoBox>
);

const LeftSide: React.FC = () => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  const isMDScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const ispStateData = useISPState();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
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

      <ISPSection
        title="وضعیت مراکز داده‌داخلی"
        ispList={InternalISPList}
        ispStatus={ispStateData}
        link="/isp"
        isXlgScreen={isXlgScreen}
        hasMoreInfo={false}
      />

      <ISPSection
        title="وضعیت مراکز داده بین‌الملل"
        ispList={ExternalISPList}
        link="/global-overview"
        isXlgScreen={isXlgScreen}
        hasMoreInfo={false}
      />
    </Box>
  );
};

export default LeftSide;
