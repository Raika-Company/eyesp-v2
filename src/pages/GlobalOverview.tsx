import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  CircularProgress,
  Container,
  Button,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { GetGlobalOverview } from "../services/GlobalOverview";
import { Link } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";

type HistoryItem = {
  status: number;
  check_time: string;
};

type WebsiteData = {
  name: string;
  domain: string;

  history: HistoryItem[];
};

type HistoryData = WebsiteData[];

interface DataBlockProps {
  value: number;
  checkTime: string;
}

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

const fetchHistoryData = (): Promise<HistoryData> => GetGlobalOverview();

const useHistoryData = () =>
  useQuery<HistoryData, Error>({
    queryKey: ["historyDataKey"],
    queryFn: fetchHistoryData,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

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

const getStatusMessage = (statusCode: number): string => {
  return errorMessages[statusCode] || "یک خطای ناشناخته رخ داده است.";
};

const getTitleMessage = (statusCode: number): string => {
  return errorTitel[statusCode] || "عنوان خطای ناشناخته";
};

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

const GlobalOverview: React.FC = () => {
  const { data, error, isLoading, refetch } = useHistoryData();

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 60000);

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
