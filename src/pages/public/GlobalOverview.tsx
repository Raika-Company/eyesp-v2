import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  CircularProgress,
  Container,
  Button,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { GetGlobalOverview } from "../../services/GlobalOverview";
import { Link } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";

/**
 * Represents a single history item with status code and check time.
 */
type HistoryItem = {
  status: number; // HTTP status code of the website check.
  check_time: string; // Time at which the check was performed, in ISO format.
};

/**
 * Represents the data structure for a website, including its name,
 * domain, and a history of status checks.
 */
type WebsiteData = {
  name: string; // Name of the website.
  domain: string; // Domain of the website.
  history: HistoryItem[]; // Array of history items representing the checks done on the website.
};

/**
 * Type alias for an array of WebsiteData.
 */
type HistoryData = WebsiteData[];

/**
 * Props for the DataBlock component, containing the value of the status
 * and the check time.
 */
interface DataBlockProps {
  value: number; // The HTTP status code of the website check.
  checkTime: string; // The time at which the check was performed.
  nextCheckTime?: string; // Optional next check time.
  data: WebsiteData; // Data about the website.
}

/**
 * Represents a period of outage with start and end times.
 */
interface OutagePeriod {
  start: string; // Start time of the outage period.
  end: string; // End time of the outage period.
}

const REFRESH_INTERVAL = 60000;

const getStatusMessage = (statusCode: number): string =>
  errorMessages[statusCode] || "یک خطای ناشناخته رخ داده است.";

const getTitleMessage = (statusCode: number): string =>
  errorTitel[statusCode] || "عنوان خطای ناشناخته";

const fetchHistoryData = (): Promise<HistoryData> => GetGlobalOverview();

const useHistoryData = () =>
  useQuery<HistoryData, Error>({
    queryKey: ["historyDataKey"],
    queryFn: fetchHistoryData,
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

/**
 * Generates a status message based on status code and outage period.
 * @param statusCode - HTTP status code.
 * @param startTime - Start time of the outage.
 * @param endTime - End time of the outage.
 * @param isOngoing - Flag indicating if the outage is ongoing.
 * @returns A string message detailing the status.
 */
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

/**
 * Finds outage periods based on the history of status checks.
 * @param history - Array of history items for a website.
 * @returns Array of OutagePeriod objects indicating the outage periods.
 */
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

/**
 * Functional component to display a single data block representing the status
 * of a website check at a specific time.
 *
 * @param value - The HTTP status code of the website check.
 * @param checkTime - The time at which the check was performed.
 */
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

/**
 * Converts a standard date string to a Persian date string.
 * @param dateString - The ISO date string to be converted.
 * @returns A string representing the date in Persian calendar format.
 */
const convertToPersianDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    calendar: "persian",
    numberingSystem: "arabext",
    localeMatcher: "best fit",
  };
  const formatter = new Intl.DateTimeFormat("fa-IR-u-nu-latn", options);
  return formatter.format(date);
};

/**
 * Functional component to display information about a single website
 * including its history of status checks.
 * @param data - Data pertaining to a single website.
 */
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
        src={`https://status.eyesp.live/images/${data.name}.svg`}
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
        const nextCheckTime = data.history[index + 1]?.check_time; // این خط را در داخل تابع map قرار دهید

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

/**
 * Component for rendering the global overview of website statuses.
 * It fetches and displays data for multiple websites and their historical statuses.
 */
const GlobalOverview: React.FC = () => {
  const { data, error, isLoading, refetch } = useHistoryData();

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, REFRESH_INTERVAL);

    return () => clearInterval(intervalId);
  }, [refetch]);

  if (isLoading) {
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
