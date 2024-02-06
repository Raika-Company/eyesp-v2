import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Button, Tooltip, Typography, useMediaQuery, useTheme, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Link, useLocation } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import serverStatusData from "../../../public/data/server_status.json";
import ModalNotData from '../../components/ui/ModalNotData';
import axios from 'axios';

type Detail = {
  time: string;
  status: string;
};

type Details = Detail[];

type StatusDetail = {
  time: string;
  status: string;
  messageFA: string;
  color: string;
  time_range: string;
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


const getTooltipMessage = (details: StatusDetail[], color: string) => {
  const detail = details[0];
  let icon;

  switch (detail.color) {
    case "yellow":
      icon = "⚠️ اختلال جزیی در اتصال";
      break;
    case "green":
      icon = "✅ اتصال بدون مشکل و سالم است";
      break;
    case "red":
      icon = "❌ قطعی کامل سرور";
      break;
    default:
      icon =
        "🔍 در حال بررسی وضعیت - لطفاً صبر کنید تا اطلاعات بیشتری دریافت کنید";
      break;
  }

  return (
    <Box
      sx={{
        color: color,
        py: "0.7em",
        px: "0.5em",
      }}
    >
      {/* <Typography variant="h3" fontWeight={800} pb={1}>
        وضعیت: {detail.status}
      </Typography> */}
      <Typography>{icon}</Typography>
      <Box
        sx={{
          py: "0.7em",
          px: "0.6em",
          my: "0.4rem",
          borderRadius: "0.3em",
          background: "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 70.56%)",
        }}
      >
        <Typography
          sx={{
            mt: "0.4rem",
          }}
        >
          زمان‌ اختلال: {detail.time_range || "محاسبه نشده"}
        </Typography>
      </Box>
      <Typography sx={{ px: "0.2em", color: "#fff" }} component="span">
        {detail.messageFA}
      </Typography>
    </Box>
  );
};

const GridItem: React.FC<{ data: WebsiteData }> = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isMiniMobile = useMediaQuery("(max-width:350px)");
  const isTablet = useMediaQuery(theme.breakpoints.between(600, 960));
  const [activeGraphMobile, setActiveGraphMobile] = useState<number | null>(
    null
  );
  const [activeGraphDesktop, setActiveGraphDesktop] = useState<number | null>(
    null
  );
  const [tooltipTimer, setTooltipTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentActiveGraph, setCurrentActiveGraph] = useState<number | null>(
    null
  );

  const handleGraphClick = (index: number) => {
    if (isMobile) {
      setCurrentActiveGraph(index);
      setActiveGraphMobile(index);

      if (tooltipTimer) clearTimeout(tooltipTimer);
      const newTimer = setTimeout(() => {
        setActiveGraphMobile(null);
      }, 1000); // 1 second
      setTooltipTimer(newTimer);
    }
  };

  const handleGraphHover = (index: number) => {
    if (!isMobile) {
      setActiveGraphDesktop(index);
    }
  };

  const handleGraphLeave = () => {
    if (!isMobile) {
      setActiveGraphDesktop(null);
    }
  };

  useEffect(() => {
    if (currentActiveGraph !== null) {
    }
  }, [currentActiveGraph]);

  useEffect(() => {
    return () => {
      if (tooltipTimer) clearTimeout(tooltipTimer);
    };
  }, [tooltipTimer]);

  const totalStatuses = data.hourly_status.slice(-24);
  const statusesCount = totalStatuses.length;
  const quarter = Math.floor(statusesCount / 4);
  const displayIndexes = [
    0,
    quarter,
    2 * quarter,
    3 * quarter,
    statusesCount - 1,
  ];

  const getFirstValidTimeForHour = (details: Details) => {
    const validDetail = details.find(
      (detail: Detail) => detail.status === "200" || detail.status === "0"
    );
    if (validDetail) {
      const timeParts = validDetail.time.split("T");
      const timeOnly = timeParts[1]; // assuming the format is "YYYY-MM-DDTHH:MM:SS"
      return timeOnly;
    } else {
      return "N/A";
    }
  };

  const statusLineStyle = (index: number, total: number) => {
    const displayInterval = Math.floor(total / 4);

    return {
      "&::before":
        index % displayInterval === 0 || index === total - 1
          ? {
            content: '""',
            display: "block",
            width: "1px",
            height: "25px",
            backgroundColor: "#3f4145",
            position: "absolute",
            top: "-26%",
            transform: "translateY(-50%)",
            right: "-0.8px",
          }
          : {},
    };
  };

  return (
    <Grid
      xs={12}
      sx={{
        maxWidth: { md: "48%", lg: "31.9%" },
        borderRadius: "0.5rem",
        background: "#2B2E31",
        boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mx: "auto",
        my: "0.75em",
        px: "1.5em",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="0.5rem"
        sx={{ textTransform: "uppercase" }}
      >
        <img
          src={`/images/${data.name}.svg`}
          alt={data.name}
          width={60}
          height={60}
        />
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: 600,
            fontSize: isMiniMobile ? "0.37rem" : "0.8rem",
          }}
        >
          {data.name}
        </Typography>
      </Box>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="60%"
        mt="2em"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="flex-end"
          width="100%"
          height="100%"
        >
          {data.hourly_status[0].details.map((statusDetail, index) => {
            const bgColor =
              statusDetail.color === "yellow"
                ? "#C99143"
                : statusDetail.color === "red"
                  ? "#E93F3F"
                  : "#7FCD9F";
            return (
              <Tooltip
                title={
                  <Typography>
                    {getTooltipMessage([statusDetail], bgColor)}
                  </Typography>
                }
                arrow
                open={
                  isMobile
                    ? activeGraphMobile === index
                    : activeGraphDesktop === index
                }
                onClick={() => handleGraphClick(index)}
                onMouseEnter={() => handleGraphHover(index)}
                onMouseLeave={handleGraphLeave}
              >
                <Box
                  bgcolor={bgColor}
                  sx={{
                    width: "10px",
                    height: "40px",
                    cursor: "pointer",
                    borderRadius: "2em",
                    mx: "0.1em",
                    "&:hover": {
                      bgcolor: "#c3c3c3",
                    },
                    position: "relative",
                    ...statusLineStyle(
                      index,
                      data.hourly_status[0].details.length
                    ),
                  }}
                />
              </Tooltip>
            );
          })}
          <Typography
            variant="subtitle1"
            sx={{
              transform: "rotate(-90deg)",
              color: "#7A7775",
              position: "absolute",
              left: "-34px",
              top: "-10px",
            }}
          >
            Disorders
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mt="0.5em"
          // width="100%"
          sx={{ width: isTablet ? "19rem" : "100%" }}
        >
          {data.hourly_status.map((hourlyStatus, index) => {
            const shouldDisplayHour = displayIndexes.includes(index);
            return (
              <Box
                key={index}
                sx={{
                  width: shouldDisplayHour ? "auto" : "0px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {shouldDisplayHour && (
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#7A7775",
                      textAlign: "center",
                      fontSize: isMiniMobile ? "0.23rem" : "0.6rem",
                    }}
                  >
                    {getFirstValidTimeForHour(hourlyStatus.details)}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Grid>
  );
};

const GlobalOverview: React.FC = () => {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  const [serverData, setServerData] = useState<WebsiteData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (type === 'internal') {
      // تنظیم مستقیم داده‌های داخلی بدون نیاز به فراخوانی API یا تبدیل اضافی
      setServerData(transformData(serverStatusData));
      setLoading(false);
    } else if (type === 'global') {
      // فراخوانی داده‌های بین‌المللی از API و تبدیل آن‌ها به فرمت مناسب
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/v1/analysis/result');
          // فرض بر اینکه داده‌های بین‌المللی به صورت شیء با کلیدهای مختلف برگشت داده می‌شوند و نیاز به تبدیل دارند
          setServerData(transformData(response.data));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching global data:', error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [type]);



  const transformData = (data: any): WebsiteData[] => {
    if (Array.isArray(data)) {

      return data.map(item => ({
        name: item.name,
        url: item.url,
        date: item.date,
        hourly_status: item.hourly_status,
      }));
    } else {
      return Object.keys(data).map(category => {
        const dailyStatuses = data[category].reduce((acc: HourlyStatus[], item: any, index: number) => {
          let analysisObjects;
          try {
            const jsonString = item.primary_analysis.replace(/'/g, '"');
            analysisObjects = JSON.parse(jsonString);
          } catch (error) {
            console.error('Error parsing primary_analysis:', error);
            analysisObjects = []; // Use an empty array in case of an error
          }

          if (index % 24 === 0) { // Every 24 items, push a new daily status object
            acc.push({
              hour: item.analysis_at.substring(0, 10), // Use only the date part
              details: [],
            });
          }

          // Add the current hour's status to the last daily status object in the accumulator
          acc[acc.length - 1].details.push({
            time: item.analysis_at,
            status: item.status_code.toString(),
            color: item.color,
            messageFA: analysisObjects[0]?.analysis?.persian || '',
            time_range: item.time_range || '',
          });

          return acc;
        }, []);

        return {
          name: category,
          url: '', // Set this to the appropriate value
          date: dailyStatuses[0]?.hour || '', // Use the date from the first hourly status
          hourly_status: dailyStatuses,
        };
      });
    }
  };




  return (
    <Box
      sx={{
        bgcolor: "transparent",
        background: "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)",
      }}
    >
      <Container maxWidth="x2">
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            pt: "1em",
            overflowX: "hidden",
          }}
        >
          <Button
            component={Link}
            to="/"
            sx={{
              fontSize: "1.5rem",
              textDecoration: "none",
              textAlign: "center",
              width: "10%",
              color: "#FFF",
              ml: isLgScreen ? "1em" : "0em",
            }}
            endIcon={<WestIcon sx={{ marginRight: "1em" }} />}
          >
            بازگشت
          </Button>
        </Box>
        {serverData ? (
          <Grid container rowSpacing={4} paddingY="1rem">
            {serverData.map((dataItem, index) => (
              <GridItem key={index} data={dataItem} />
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </Container>
      <ModalNotData serverStatusData={serverStatusData} />
    </Box>
  );
};

export default GlobalOverview;
