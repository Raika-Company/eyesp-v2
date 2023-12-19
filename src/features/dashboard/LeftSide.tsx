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
import { ISPStateType, useISPState } from "./hooks/useISPState";
import { useEffect, useState } from "react";
import StatusTooltip from "../../components/ui/StatusTooltip";
import PulseCircle from "../../components/ui/PulseCircle";
import api from "../../services";
import { MetricsReturnType } from "../../services/dashboard/metrics";

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
  province?: "tehran" | "alborz" | "ahvaz";
  isActive: boolean;
  speed?: string; // Include if speed is a property for any of the ISPs
}

interface ISPSectionProps {
  title: string;
  ispList: ISP[];
  ispStatus: {
    ipxAverage: number;
    igwAverage: number;
    tehran: ISPStateType;
    alborz: ISPStateType;
    ahvaz: ISPStateType;
  };
  internal: boolean;
  link: string;
  isXlgScreen: boolean;
  hasMoreInfo?: boolean;
}

export const InternalISPList: {
  id: number;
  name: string;
  province: "tehran" | "ahvaz" | "alborz";
  isActive: boolean;
  speed: string;
}[] = [
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
  const [hoveredIsp, setHoveredIsp] = useState<
    "tehran" | "ahvaz" | "alborz" | null
  >(null);
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
              <PulseCircle
                internal={internal}
                hoveredIsp={hoveredIsp}
                province={isp.province!}
                setHoveredIsp={setHoveredIsp}
                setTooltipPosition={setTooltipPosition}
                tooltipPosition={tooltipPosition}
                isActive={isp.isActive}
              />
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

  const [networkState, setNetworkState] = useState<MetricsReturnType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    api.metrics.getAllMetrics().then((res) => {
      setNetworkState(res.data);
      setLoading(false);
    });
  }, []);

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
          <NumberValue
            title="Upload"
            value={loading ? 0 : networkState!.uploadAverage!}
            unit="mbps"
          />
          <NumberValue
            title="Download"
            value={loading ? 0 : networkState!.downloadAverage!}
            unit="mbps"
          />
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
