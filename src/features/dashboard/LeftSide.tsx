import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  keyframes,
} from "@mui/material";
import NumberValue from "./ـcomponents/NumberValue";
import AverageIcon from "../../assets/images/average-icon.svg";
import ArrowLeftGreen from "../../assets/images/arrow-left-green.svg";
import ChartIcon from "../../assets/images/chart-icon.svg";
import { Link } from "react-router-dom";
import InfoBox from "../../components/ui/InfoBox";
import { useISPState } from "./hooks/useISPState";
import { useState } from "react";
import StatusTooltip from "../../components/ui/StatusTooltip";

const pulse = keyframes`
from {
    transform: scale(1);
  }
  to {
    transform: scale(2.5);
  }
`;

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
  ispStatus: {
    [x: string]: {
      isActive: boolean;
      igw: string;
      igwColor: string;
      ipx: string;
      ipxColor: string;
    };
  };
  internal: boolean;
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
  internal,
  link,
  isXlgScreen,
  hasMoreInfo,
}) => {
  const [hoveredIsp, setHoveredIsp] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  return (
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
              <Box
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  if (!hoveredIsp || tooltipPosition) {
                    setHoveredIsp(isp.province!);
                    setTooltipPosition({ x: e.pageX, y: e.pageY });
                  }
                }}
                onMouseLeave={() => setHoveredIsp(null)}
                sx={{
                  borderRadius: "50%",
                  width: "11px",
                  height: "11px",
                  background:
                    internal && ispStatus
                      ? ispStatus[isp.province!].isActive
                        ? "#84D1A3"
                        : "#BA3535"
                      : "#84D1A3",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    borderRadius: "50%",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    background:
                      internal && ispStatus
                        ? ispStatus[isp.province!].isActive
                          ? "#84D1A333"
                          : "#BA353533"
                        : "#84D1A388",
                    animation: `${pulse} ${
                      0.6 * Math.random() + 0.5
                    }s infinite alternate linear`,
                  },
                }}
              ></Box>
            </Stack>
            <Divider
              style={{
                background: "#35383B",
                margin: ".5rem",
              }}
            />
            {hoveredIsp && (
              <StatusTooltip
                ipx={ispStatus[hoveredIsp].ipx}
                ipxColor={ispStatus[hoveredIsp].ipxColor}
                igw={ispStatus[hoveredIsp].igw}
                igwColor={ispStatus[hoveredIsp].igwColor}
                x={`calc(${tooltipPosition!.x}px - 75px)`}
                y={`calc(${tooltipPosition!.y}px - 150px)`}
              />
            )}
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
};

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
        internal
        ispList={InternalISPList}
        ispStatus={ispStateData!}
        link="/isp"
        isXlgScreen={isXlgScreen}
        hasMoreInfo={false}
      />

      <ISPSection
        title="وضعیت مراکز داده بین‌الملل"
        ispList={ExternalISPList}
        ispStatus={ispStateData!}
        internal={false}
        link="/global-overview"
        isXlgScreen={isXlgScreen}
        hasMoreInfo={true}
      />
    </Box>
  );
};

export default LeftSide;
