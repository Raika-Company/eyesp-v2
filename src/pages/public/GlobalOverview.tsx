import React, { useEffect, useState } from "react";
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
import { convertToPersianDate } from "../../utils/convertToPersianDate";
import serverStatusData from '../../../public/data/server_status.json';


interface DataBlockProps {
  value: number; // The HTTP status code of the website check.
  checkTime: string; // The time at which the check was performed.
  data: WebsiteData; // Data about the website.
  statusMessage?: string; // Optional status message.
}


type StatusDetail = {
  time: string;
  status: string;
};

type HourlyStatus = {
  hour: string;
  details: StatusDetail[];
};

type WebsiteData = {
  name: string;
  url: string;
  date: string;
  hourly_status: HourlyStatus[];
};



/**
 * Represents a single history item with status code and check time.
 */
type HistoryItem = {
  status: number; // HTTP status code of the website check.
  check_time: string; // Time at which the check was performed, in ISO format.
};

/**
 * Represents a period of outage with start and end times.
 */
interface OutagePeriod {
  start: string; // Start time of the outage period.
  end: string; // End time of the outage period.
}

export const REFRESH_INTERVAL = 60000;


const getStatusMessage = (statusCode: number): string =>
  errorMessages[statusCode] || "یک خطای ناشناخته رخ داده است.";

const getTitleMessage = (statusCode: number): string =>
  errorTitel[statusCode] || "عنوان خطای ناشناخته";


const errorMessages: Record<number, string> = {
  200: "درخواست با موفقیت انجام شد.",
  401: "دسترسی به صورت موقت قطع شده است لطفا دقایقی بعد تلاش کنید.",
  403: "دسترسی به صورت موقت قطع شده است لطفا بعدا تلاش کنید.",
  404: "صفحه مورد نظر یافت نشد.",
  500: "سرویس موقتا در دسترس نیست. لطفا دقایقی بعد تلاش کنید.",
  503: "سرویس موقتا در دسترس نیست. لطفا دقایقی بعد تلاش کنید.",
};

const errorTitel: Record<number, string> = {
  200: "✅ بدون قطعی",
  401: "❌ قطعی کامل سرویس",
  403: "❌ قطعی کامل سرویس",
  404: "❌ قطعی کامل سرویس",
  500: "⚠️ قطعی جزئي",
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
  if (statusCode === 200) {
    return "";
  }

  const formattedStartTime = convertToPersianDate(startTime);
  const formattedEndTime = convertToPersianDate(endTime);
  return `قطعی سرویس از ${formattedStartTime} تا ${formattedEndTime}`;
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
const DataBlock: React.FC<DataBlockProps> = React.memo(({ value, statusMessage }) => {
  const errorMessage = getStatusMessage(value);
  const statusTitle = getTitleMessage(value);

  let bgColor = "#E93F3F";
  if (value === 200) {
    bgColor = "#7FCD9F";
  } else if (value === 403) {
    bgColor = "#E93F3F";
  } else if (value === 503 || value === 500) {
    bgColor = "#f19e2c";
  }

  return (
    <Tooltip
      arrow
      title={
        <Box sx={{ p: "0.3em", userSelect: "none" }}>
          <Typography color={bgColor} fontSize="1.3rem">
            وضعیت: {value}
          </Typography>
          <Typography
            sx={{
              my: "0.5em",
              bgcolor: "#777777",
              p: ".4em",
              borderRadius: ".2em",
              fontSize: "1.2rem",
            }}
          >
            {statusMessage && (
              <Typography sx={{ mt: "0.5em" }}>{statusMessage}</Typography>
            )}
            {statusTitle}:
            <Typography>{errorMessage}</Typography>
          </Typography>
        </Box>
      }
    >
      <Box
        bgcolor={bgColor}
        my={0.3}
        sx={{
          width: "10px",
          height: "50px",
          mx: "0.1em",
          cursor: "pointer",
          borderRadius: '2em',
          "&:hover": {
            bgcolor: "darkgray",
          },
        }}
      />
    </Tooltip>
  );
});


/**
 * Functional component to display information about a single website
 * including its history of status checks.
 * @param data - Data pertaining to a single website.
 */
const GridItem: React.FC<{ data: WebsiteData }> = ({ data }) => {
  const allStatuses = data.hourly_status.flatMap(hourlyStatus =>
    hourlyStatus.details.map(detail => ({
      status: parseInt(detail.status, 10),
      check_time: `${data.date}T${hourlyStatus.hour}:${detail.time}`
    }))
  );

  const outagePeriods = findOutagePeriods(allStatuses);
  return (
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
        width="60%"
        height="100%"
        padding="1rem"
      >
        {allStatuses.slice(-24).map((item, index) => {
          const statusMessage = item.status !== 200
            ? outagePeriods
              .filter(period => item.check_time >= period.start && item.check_time <= period.end)
              .map(period => generateStatusMessage(item.status, period.start, period.end))
              .join(", ") || "وضعیت نامشخص"
            : "";

          return (
            <DataBlock
              key={index}
              value={item.status}
              checkTime={item.check_time}
              data={data}
              statusMessage={statusMessage}
            />
          );
        })}
      </Box>
    </Grid>
  )
};

/**
 * Component for rendering the global overview of website statuses.
 * It fetches and displays data for multiple websites and their historical statuses.
 */
const GlobalOverview: React.FC = () => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const navigate = useNavigate();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (serverStatusData && serverStatusData.length > 0) {
      setDataLoaded(true);
    } else {

      const timer = setTimeout(() => {
        setShowModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  if (showModal && !dataLoaded) {
    return (
      <Modal open={showModal}>
        <Box sx={{ textAlign: "center", bgcolor: "#2c2e32", width: isSmScreen ? "22rem" : "27rem", p: isSmScreen ? "1em" : "3em", mx: "auto", my: "20em", borderRadius: ".5em" }}>
          <Typography sx={{ mb: "2em", fontSize: "0.9rem" }}>متاسفانه در حال حاضر قادر به دریافت دیتا نمی باشیم, <br /> لطفا بعدا امتحان کنید.</Typography>
          <Button sx={{ bgcolor: "#4D765F" }} onClick={() => { window.location.reload(); handleCloseModal(); }}>بروزرسانی صفحه</Button>
          <Button sx={{ bgcolor: "#4D765F", mr: "2em" }} onClick={() => { navigate("/"); handleCloseModal(); }}>رفتن به صفحه اصلی</Button>
        </Box>
      </Modal>
    );
  }
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
      {dataLoaded ? (
        <Grid container rowSpacing={4} paddingY="2rem">
          {serverStatusData.map((serverData, index) => (
            <GridItem key={index} data={serverData} />
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default GlobalOverview;
