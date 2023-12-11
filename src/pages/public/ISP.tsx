import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Container,
  Button,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import WestIcon from "@mui/icons-material/West";
import zitel from "../../assets/images/zitel.png";
import mokhaberat from "../../assets/images/mokhaberat.png";
import hamrahaval from "../../assets/images/hamrahaval.png";
import irancell from "../../assets/images/irancell.svg";
import { Link } from "react-router-dom";
import { REFRESH_INTERVAL } from "./GlobalOverview";
import { GetGlobalOverview } from "../../services/GlobalOverview";

/**
 * Type for individual history items in the website data.
 * @param status The status code of the website check.
 * @param check_time The timestamp of the website check.
 */
type HistoryItem = {
  status: number;
  check_time: string;
};

/**
 * Type for website data structure.
 * @param domain The domain name of the website.
 * @param history Array of history items.
 */
type WebsiteData = {
  domain: string;
  history: HistoryItem[];
};

/**
 * Type for an array of website data.
 */
export type HistoryData = WebsiteData[];

/**
 * Props for the DataBlock component.
 * @param value The status code of the website check.
 * @param checkTime The timestamp of the website check.
 */
interface DataBlockProps {
  value: number;
  checkTime: string;
}

/**
 * Constants for mapping logos and error messages.
 */
const LOGOS = [
  { src: zitel, name: "زیتل" },
  { src: mokhaberat, name: "مخابرات" },
  { src: hamrahaval, name: "همراه اول" },
  { src: irancell, name: "ایرانسل" },
];

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
 * Custom hook for using the history data query.
 * @returns The query object containing the data, error, loading state, etc.
 */
const useHistoryData = () =>
  useQuery<HistoryData, Error>({
    queryKey: ["historyDataKey"],
    queryFn: GetGlobalOverview,
    staleTime: REFRESH_INTERVAL,
    refetchOnWindowFocus: false,
  });

/**
 * Gets the status message for a given status code.
 * @param statusCode The status code to get the message for.
 * @returns The corresponding message string.
 */
const getStatusMessage = (statusCode: number): string => {
  return errorMessages[statusCode] || "یک خطای ناشناخته رخ داده است.";
};

/**
 * Gets the title message for a given status code.
 * @param statusCode The status code to get the title for.
 * @returns The corresponding title string.
 */
const getTitleMessage = (statusCode: number): string => {
  return errorTitel[statusCode] || "عنوان خطای ناشناخته";
};

/**
 * Converts a date string to a Persian date format.
 * @param dateString The date string to convert.
 * @returns The formatted Persian date string.
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
 * DataBlock component representing a single data point in the history.
 * @param props DataBlockProps
 * @returns A JSX element representing the data block.
 */
const DataBlock = React.memo<DataBlockProps>(({ value, checkTime }) => {
  const errorMessage = getStatusMessage(value);
  const statusTitle = getTitleMessage(value);
  const persianDate = convertToPersianDate(checkTime);

  return (
    <Tooltip
      arrow
      title={
        <Box sx={{ p: "0.3em", userSelect: "none" }}>
          <Typography
            color={
              value === 200 ? "#7FCD9F" : value === 503 ? "#f19e2c" : "#E93F3F"
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
            {statusTitle}: <br /> {persianDate}
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
});

/**
 * GridItem component for displaying a single website's data.
 * @param props Contains the website data and associated logo.
 * @returns A JSX element representing the grid item.
 */
const GridItem: React.FC<{ data: WebsiteData; logo: (typeof LOGOS)[0] }> = ({
  data,
  logo,
}) => (
  <Grid
    xs={12}
    sx={{
      maxWidth: { md: "48%" },
      borderRadius: "0.5rem",
      background: "#2B2E31",
      boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mx: "auto",
      my: ".85em",
      px: "1.5em",
      userSelect: "none",
    }}
  >
    <Box display="flex" flexDirection="column" alignItems="center" gap="0.5rem">
      <img src={logo.src} alt={logo.name} height="52px" />
      <Typography sx={{ textAlign: "center" }}>{logo.name}</Typography>
    </Box>
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      width="77%"
      height="100%"
      padding="1rem"
    >
      {data.history.map((historyItem, index) => (
        <DataBlock
          key={index}
          value={historyItem.status}
          checkTime={historyItem.check_time}
        />
      ))}
    </Box>
  </Grid>
);

/**
 * ISP component for displaying the status of various websites.
 * Fetches and displays data using a custom hook and renders a grid of GridItems.
 * @returns A JSX element representing the ISP component.
 */
const ISP: React.FC = () => {
  const { data, error, isLoading, refetch } = useHistoryData();

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
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
          marginTop: "1.5em",
        }}
        endIcon={<WestIcon sx={{ marginRight: ".5em" }} />}
      >
        بازگشت
      </Button>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: -5, sm: -5 }}
        paddingY="2rem"
      >
        {data &&
          Array.isArray(data) &&
          data.map((websiteData: WebsiteData, index: number) => (
            <GridItem
              key={index}
              data={websiteData}
              logo={LOGOS[index % LOGOS.length]}
            />
          ))}
      </Grid>
    </Container>
  );
};

export default ISP;
