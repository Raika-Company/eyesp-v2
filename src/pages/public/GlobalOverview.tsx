import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  CircularProgress,
  Container,
  Button,
  Tooltip,
  Typography,
  Modal,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Link, useNavigate } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import { GetGlobalOverview } from "../../services/GlobalOverview";
import { convertToPersianDate } from "../../utils/convertToPersianDate";

type HistoryItem = {
  status: number;
  check_time: string;
};

type WebsiteData = {
  name?: string;
  domain: string;
  history: HistoryItem[];
};

type HistoryData = WebsiteData[];

interface DataBlockProps {
  value: number; 
  checkTime: string;
  nextCheckTime?: string;
  data: WebsiteData;
}

interface OutagePeriod {
  start: string;
  end: string;
}

export const REFRESH_INTERVAL = 60000;

const getStatusMessage = (statusCode: number): string =>
  errorMessages[statusCode] || "یک خطای ناشناخته رخ داده است.";

const getTitleMessage = (statusCode: number): string =>
  errorTitel[statusCode] || "عنوان خطای ناشناخته";

const useHistoryData = () =>
  useQuery<HistoryData, Error>({
    queryKey: ["historyDataKey"],
    queryFn: GetGlobalOverview,
    staleTime: REFRESH_INTERVAL,
    refetchOnWindowFocus: false,
  });

const errorMessages: Record<number, string> = {
  200: "درخواست با موفقیت انجام شد.",
  403: "دسترسی به صورت موقت قطع شده است.",
  404: "صفحه مورد نظر یافت نشد.",
  503: "سرویس موقتا در دسترس نیست. لطفا دقایقی بعد تلاش کنید.",
};

const errorTitel: Record<number, string> = {
  200: "✅ بدون قطعی",
  403: "❌ قطعی کامل",
  404: "❌ صفحه مورد نظر در دسترس نیست",
  503: "⚠️ قطعی جزئی",
};

const generateStatusMessage = (
  statusCode: number,
  startTime: string,
  endTime: string
): string => {
  const formattedStartTime = convertToPersianDate(startTime);
  const formattedEndTime = convertToPersianDate(endTime);

  let message;
  switch (statusCode) {
    case 403:
    case 404:
      message = `قطعی کامل سرویس از ${formattedEndTime} تا ${formattedStartTime}`;
      break;
    case 503:
      message = `اختلال در سرویس از ${formattedEndTime} تا ${formattedStartTime}`;
      break;
    default:
      message = "";
  }

  return message;
};

const findOutagePeriods = (history: HistoryItem[]): OutagePeriod[] => {
  const outagePeriods: OutagePeriod[] = [];
  let outageStart: string | null = null;

  history.forEach((item) => {
    if (item.status !== 200 && !outageStart) {
      outageStart = item.check_time;
    } else if (item.status === 200 && outageStart) {
      outagePeriods.push({
        start: outageStart,
        end: item.check_time,
      });
      outageStart = null;
    }
  });

  if (outageStart) {
    outagePeriods.push({
      start: outageStart,
      end: history[history.length - 1].check_time,
    });
  }

  return outagePeriods;
};

const DataBlock: React.FC<DataBlockProps> = React.memo(
  ({ value, checkTime, data }) => {
    const errorMessage = getStatusMessage(value);
    const statusTitle = getTitleMessage(value);

    let statusMessage = "";

    const currentPeriod = findOutagePeriods(data.history).find(
      (period) => period.start === checkTime
    );

    if (currentPeriod) {
      statusMessage = generateStatusMessage(
        value,
        currentPeriod.start,
        currentPeriod.end || new Date().toISOString()
      );
    }

    return (
      <Tooltip
        arrow
        title={
          <Box sx={{ p: "0.3em", userSelect: "none" }}>
            <Typography
              color={
                value === 200
                  ? "#7FCD9F"
                  : value === 503
                    ? "#f19e2c"
                    : "#E93F3F"
              }
              fontSize="1.3rem"
            >
              وضعیت: {value}
            </Typography>
            <Typography
              sx={{
                my: "1em",
                bgcolor: "#777777",
                p: ".4em",
                borderRadius: ".2em",
                fontSize: "1.2rem",
              }}
            >
              {statusTitle}:
              {statusMessage && <Typography>{statusMessage}</Typography>}
            </Typography>
            <Typography>{errorMessage}</Typography>
          </Box>
        }
      >
        <Box
          width="3%"
          height="62px"
          borderRadius="2em"
          bgcolor={
            value === 200 ? "#7FCD9F" : value === 503 ? "#f19e2c" : "#E93F3F"
          }
          mx={0.3}
          sx={{
            cursor: "pointer",
            "&:hover": {
              bgcolor: "darkgray",
            },
          }}
        />
      </Tooltip>
    );
  }
);

const GridItem: React.FC<{ data: WebsiteData }> = ({ data }) => (
  <Grid
    xs={12}
    sx={{
      maxWidth: { md: "48%" },
      borderRadius: "0.5rem",
      background: "#2B2E31",
      boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mx: "auto",
      my: ".85em",
      px: "1.5em",
    }}
  >
    <Box sx={{ textTransform: "uppercase" }}>
      <img
        src={`/images/${data.name}.svg`}
        alt={data.name}
      />
      <Typography
        sx={{
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        {data.name}
      </Typography>
    </Box>
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      width="75%"
      height="100%"
      padding="1rem"
    >
      {data.history.map((historyItem, index) => {
        const nextCheckTime = data.history[index + 1]?.check_time;

        return (
          <DataBlock
            key={index}
            value={historyItem.status}
            checkTime={historyItem.check_time}
            nextCheckTime={nextCheckTime}
            data={data}
          />
        );
      })}
    </Box>
  </Grid>
);

const GlobalOverview: React.FC = () => {
  const theme = useTheme();
  const { data, error, isLoading, refetch } = useHistoryData();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));


  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setShowModal(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [refetch]);

  if (isLoading && !showModal) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
      </div>
    );
  }
  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (showModal) {
    return (
      <Modal open={showModal}>
        <Box sx={{ textAlign: "center", bgcolor: "#2c2e32", width: isSmScreen ? "22rem" : "27rem", p: isSmScreen ? "1em" : "3em", mx: "auto", my: "20em", borderRadius: ".5em" }}>
          <Typography sx={{ mb: "2em", fontSize: "0.9rem" }}>متاسفانه در حال حاضر قادر به دریافت دیتا نمی باشیم, <br /> لطفا بعدا امتحان کنید.</Typography>
          <Button sx={{ bgcolor: "#4D765F" }} onClick={() => { window.location.reload(); handleCloseModal(); }}>بروزرسانی صفحه</Button>
          <Button sx={{ bgcolor: "#4D765F", mr: "2em" }} onClick={() => { navigate("/"); handleCloseModal(); }}>رفتن به صفحه اصلی</Button>
        </Box>
      </Modal >
    );
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container maxWidth="xl">
      <Button
        component={Link}
        to="/"
        sx={{
          fontSize: "1.5rem",
          textDecoration: "none",
          textAlign: "center",
          width: "100%",
          color: "#FFF",
          marginTop: "2rem",
        }}
        endIcon={<WestIcon sx={{ marginRight: "1rem" }} />}
      >
        بازگشت
      </Button>
      <Grid container rowSpacing={4} paddingY="2rem">
        {data &&
          Array.isArray(data) &&
          data.map((websiteData: WebsiteData, index: number) => (
            <GridItem key={index} data={websiteData} />
          ))}
      </Grid>
    </Container>
  );
};

export default GlobalOverview;
