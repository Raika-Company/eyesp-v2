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
import WhiteSpeedTest from "../../assets/images/white-speed.svg";
import ArrowLeftGreen from "../../assets/images/arrow-left-green.svg";
import ChartIcon from "../../assets/images/chart-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import InfoBox from "../../components/ui/InfoBox";
import { ISPStateType, useISPState } from "./hooks/useISPState";
import { useEffect, useState } from "react";
import StatusTooltip from "../../components/ui/StatusTooltip";
import PulseCircle from "../../components/ui/PulseCircle";
import api from "../../services";
import { MetricsReturnType } from "../../services/dashboard/metrics";
import { toast } from "react-toastify";

/**
 * Interface representing the structure of an ISP (Internet Service Provider).
 */
interface ISP {
  id: number;
  name: string;
  province?: "tehran" | "alborz" | "ahvaz";
  isActive: boolean;
  speed?: string; // Include if speed is a property for any of the ISPs
}

/**
 * Interface representing the props for the `ISPSection` component.
 */
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

/**
 * Internal ISP data list.
 */
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

/**
* External ISP data list.
*/
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

/**
 * Functional component representing a section for ISP information.
 * 
 * This component displays ISP information, including their names, status, and additional details.
 * 
 * @param {ISPSectionProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX element representing the ISP section.
 */
const ISPSection: React.FC<ISPSectionProps> = ({
  title,
  ispList,
  ispStatus,
  internal,
  link,
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
          paddingX: ".6rem",
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
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
              height: ".5rem",
              marginY: ".5rem",
            }}
          >
            <Button
              component={Link}
              to={link}
              sx={{ color: "#7FCD9F", fontSize: ".8rem" }}
            >
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

/**
 * Functional component representing the left side section of the application.
 * 
 * This component includes various information boxes and displays data related to ISP (Internet Service Provider) statistics.
 * It consists of:
 * - Average upload and download speed.
 * - Speed test button.
 * - Internal ISP section.
 * - External ISP section.
 * 
 * @returns {JSX.Element} - The JSX element representing the left side section.
 */
const LeftSide: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMdScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  const ispStateData = useISPState();

  const [networkState, setNetworkState] = useState<
    MetricsReturnType | { uploadAverage: number; downloadAverage: number }
  >({ uploadAverage: 0, downloadAverage: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    api.metrics
      .getAllMetrics()
      .then((res) => {
        setNetworkState(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error(
          "مشکلی در ارتباط با سرور ایجاد شده است. لطفا دقایقی دیگر تلاش کنید."
        );
      });
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns:
          isMdScreen && !isSmScreen && !isLgScreen ? "1fr 1fr 1fr" : "1fr",
        gridRow: isMdScreen && !isLgScreen && !isSmScreen ? "3 / 4" : "",
        gridTemplateRows:
          isMdScreen && !isSmScreen && !isLgScreen ? "1fr" : "1fr 3rem 1fr 1fr",
        gap: isXlgScreen ? "1.5rem" : "1rem",
      }}
    >
      <InfoBox title="میانگین کلی" iconPath={AverageIcon}>
        <Stack
          direction="row"
          sx={{
            padding: "1rem",
            marginY: "auto",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <NumberValue
            title="Upload"
            value={
              loading || !networkState ? 8 : networkState.uploadAverage || 0
            }
            unit="mbps"
          />
          <NumberValue
            title="Download"
            value={
              loading || !networkState ? 7 : networkState.downloadAverage || 0
            }
            unit="mbps"
          />
        </Stack>
      </InfoBox>

      <Button
        sx={{
          boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
          background: "#2B2E31",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          order: isMdScreen && !isSmScreen && !isLgScreen ? 1 : 0,
          gridColumn:
            isMdScreen && !isSmScreen && !isLgScreen ? "1/4" : "initial",
          gap: ".3rem",
        }}
        onClick={() => navigate("/speed-test")}
      >
        <img src={WhiteSpeedTest} />
        <Typography fontFamily="PeydaExtraBold">تست سرعت</Typography>
      </Button>
      <ISPSection
        title="مراکز داده‌داخلی"
        internal
        ispList={InternalISPList}
        ispStatus={ispStateData!}
        link="/global-overview?type=internal"
        isXlgScreen={isXlgScreen}
        hasMoreInfo={true}
      />

      <ISPSection
        title="مراکز داده بین‌الملل"
        ispList={ExternalISPList}
        ispStatus={ispStateData!}
        internal={false}
        // link="/global-overview"
        link="/global-overview?type=external"
        isXlgScreen={isXlgScreen}
        hasMoreInfo={true}
      />
    </Box>
  );
};

export default LeftSide;
