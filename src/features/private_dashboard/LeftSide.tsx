import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Conflicts from "../../assets/images/conflicts.svg";
import HistoryInfo from "../../assets/images/history-info.svg";
import ArrowLeftGreen from "../../assets/images/arrow-left-green.svg";
import Average from "../../assets/images/speed-compare.svg";
import FullArrowGreen from "../../assets/images/fullarrow-left-green.svg";
import TaggedNumber from "./ـcomponents/TaggedNumber";
import CircleChart from "../../components/ui/CircularChart";
import InfoBox from "../../components/ui/InfoBox";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MetricsReturnType } from "../../services/dashboard/metrics";
import api from "../../services";
import { toast } from "react-toastify";

const ConflictsData = [
  {
    id: 1,
    title: "افزایش پینگ اپراتور ایرانسل به ۸۰ در استان تهران",
  },
  {
    id: 2,
    title: "افزایش پینگ اپراتور ایرانسل به ۸۰ در استان تهران",
  },
  {
    id: 3,
    title: "افزایش پینگ اپراتور ایرانسل به ۸۰ در استان تهران",
  },
];

const conflictsHistoryMockData = [
  {
    id: 11,
    conflicts: ["افزایش پینگ"],
    isp: ["ایرانسل"],
    cities: ["تهران"],
    time: "22:35",
  },
  {
    id: 22,
    conflicts: ["کاهش سرعت"],
    isp: ["رایتل"],
    cities: ["مشهد"],
    time: "22:35",
  },
  {
    id: 33,
    conflicts: ["افزایش پینگ"],
    isp: ["همراه‌اول"],
    cities: ["اهواز"],
    time: "22:35",
  },
  {
    id: 44,
    conflicts: ["افزایش پینگ"],
    isp: ["ایرانسل"],
    cities: ["تهران"],
    time: "22:35",
  },
];

const LeftSide: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMdScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));

  const [metricsData, setMetricsData] = useState<MetricsReturnType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setLoading(true);
    api.metrics
      .getAllMetrics()
      .then((res) => {
        setMetricsData(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error(
          "مشکلی در ارتباط با سرور ایجاد شده است. لطفا دقایقی دیگر تلاش کنید."
        );
      });
  }, []);

  const navigateToAverage = () => {
    navigate("/private/average");
  };

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
        gridRow: isMdScreen && !isLgScreen && !isSmScreen ? "3 / 4" : "",
      }}
    >
      <InfoBox title="اختلال‌های فعلی" iconPath={Conflicts}>
        <Box
          sx={{
            paddingX: ".5rem",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            marginY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <TaggedNumber value={3} title="مورد" />
            <TaggedNumber value={1} title="استان" />
            <TaggedNumber value={8} title="ISP" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
            }}
          >
            {ConflictsData.map((conflict) => (
              <Fragment key={conflict.id}>
                <Stack
                  direction="row"
                  gap=".5rem"
                  whiteSpace="nowrap"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      fontSize: isLgScreen
                        ? ".65rem !important"
                        : ".3rem !important",
                    }}
                  >
                    {conflict.title}
                  </Typography>
                  <Button
                    sx={{
                      color: "#fff",
                      fontSize: ".5rem !important",
                      background: "#7A7775",
                      paddingY: ".2rem",
                      borderRadius: ".5rem",
                      marginRight: "auto",
                    }}
                  >
                    هوش مصنوعی
                  </Button>
                </Stack>
                <Divider
                  sx={{
                    width: "100%",
                    marginX: "auto",
                    background: "#35383B",
                    height: "2px",
                  }}
                />
              </Fragment>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: ".1rem",
            }}
          >
            <Button>
              <Stack direction="row" gap={0.5}>
                <img
                  src={Conflicts}
                  style={{
                    width: "13px",
                    height: "13px",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: ".8rem",
                  }}
                >
                  گزارش خطا
                </Typography>
              </Stack>
            </Button>
            <Button>
              <Link
                style={{
                  textDecoration: "none",
                }}
                to="/last-disorders"
              >
                <Stack direction="row" gap={0.5} alignItems="center">
                  <Typography
                    sx={{
                      color: "#7FCD9F",
                      fontSize: ".8rem",
                    }}
                  >
                    مشاهده جزئیات
                  </Typography>
                  <img src={FullArrowGreen} />
                </Stack>
              </Link>
            </Button>
          </Box>
        </Box>
      </InfoBox>
      <InfoBox title="تاریخچه اختلالات" iconPath={HistoryInfo}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            padding: ".5rem",
          }}
        >
          {conflictsHistoryMockData.map((data) => (
            <Fragment key={data.id}>
              <Stack direction="row" gap=".5rem" justifyContent="space-between">
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: ".7rem",
                  }}
                >
                  {data.conflicts.join(",")}|{data.isp.join(",")}|
                  {data.cities.join(",")}
                </Typography>
                <Typography>{data.time}</Typography>
              </Stack>
              <Divider
                sx={{
                  width: "100%",
                  marginX: "auto",
                  background: "#35383B",
                  height: "2px",
                }}
              />
            </Fragment>
          ))}
        </Box>
        <Stack
          direction="row"
          component={Link}
          to="/disorders"
          sx={{
            textDecoration: "none",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "space-between",
            ":active": {
              textDecoration: "none",
            },
          }}
        >
          <Button sx={{ color: "#7FCD9F" }}>مشاهده جذئیات و بیشتر</Button>
          <img
            src={ArrowLeftGreen}
            style={{
              marginLeft: "1rem",
            }}
          />
        </Stack>
      </InfoBox>
      <InfoBox
        title="میانگین کلی"
        iconPath={Average}
        hasButton
        onClick={navigateToAverage}
      >
        <Box
          sx={{
            padding: ".5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginY: "auto",
          }}
        >
          <Stack direction="row" justifyContent="space-around" gap={1}>
            <CircleChart
              finalPercentage={66}
              size={60}
              textTitle="میانگین دانلود"
              value={loading ? "--" : metricsData?.downloadAverage || 0}
              unit="Mbps"
            />
            <CircleChart
              finalPercentage={40}
              size={60}
              textTitle="میانگین آپلود"
              value={loading ? "--" : metricsData?.uploadAverage || 0}
              unit="Mbps"
            />
            <CircleChart
              finalPercentage={52}
              size={60}
              textTitle="میانگین "
              value={loading ? "--" : metricsData?.pingAverage || 0}
              unit="Ms"
            />
          </Stack>
          <Stack
            sx={{
              marginTop: ".5rem",
            }}
          >
            <Typography>وضعیت کلی اینترنت کشور:</Typography>
            <Typography color="#7FCD9F">عادی و مطلوب</Typography>
          </Stack>
        </Box>
      </InfoBox>
    </Box>
  );
};

export default LeftSide;
