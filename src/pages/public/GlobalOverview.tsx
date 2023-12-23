import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Button, Tooltip, Typography, useMediaQuery, useTheme, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Link } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import serverStatusData from "../../../public/data/server_status.json";
import ModalNotData from '../../components/ui/ModalNotData';

type Detail = {
  time: string;
  status: string;
};

type Details = Detail[];

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

const getHourlyStatusColor = (hourlyDetails: StatusDetail[]) => {
  const non200Count = hourlyDetails.filter(
    (detail) => parseInt(detail.status, 10) !== 200
  ).length;
  if (non200Count > 4) return "#E93F3F";
  if (non200Count >= 2) return "#f19e2c";
  return "#7FCD9F";
};

const getTooltipMessage = (hourlyDetails: StatusDetail[], color: string) => {
  const non200Details = hourlyDetails.filter(
    (detail) => parseInt(detail.status, 10) !== 200
  );
  let tooltipContent = [];

  if (color === "#E93F3F") {
    const start = non200Details[0].time;
    const end = non200Details[non200Details.length - 1].time;
    tooltipContent.push(
      <Typography
        sx={{ color: color, fontSize: "1.3rem", py: "0.5em", px: "0.5em" }}
      >
        ❌ قطعی کامل سرویس
      </Typography>,
      <Typography sx={{ bgcolor: "#2B2E31", p: "1em" }}>
        قطعی کامل سرویس از ساعت {start} تا ساعت {end}
      </Typography>,
      <Typography sx={{ mt: "0.5em" }}>
        دسترسی به صورت موقت قطع شده است لطفا بعدا تلاش کنید.
      </Typography>
    );
  } else if (color === "#7FCD9F") {
    tooltipContent.push(
      <Typography sx={{ color: color, fontSize: "1.3rem", mt: "0.2em" }}>
        وضعیت : 200
      </Typography>,
      <Typography
        sx={{
          bgcolor: "#2B2E31",
          py: "0.5em",
          px: "0.5em",
          color: color,
          fontSize: "1.3rem",
          mt: "0.2em",
        }}
      >
        ✅ بدون قطعی
      </Typography>,
      <Typography sx={{ mt: "0.2em", mx: "0.2em" }}>
        درخواست با موفقیت انجام شد.
      </Typography>
    );
  } else if (color === "#f19e2c" && non200Details.length > 0) {
    const start = non200Details[0].time;
    const end = non200Details[non200Details.length - 1].time;
    tooltipContent.push(
      <Typography sx={{ color: color, fontSize: "1.3rem", my: "0.4rem" }}>
        ⚠️ اختلال جزئی در اتصال
      </Typography>,
      <Typography sx={{ bgcolor: "#2B2E31", py: "0.5em", px: "0.5em" }}>
        اختلال جزئی از ساعت {start} تا ساعت {end}
      </Typography>,
      <Typography sx={{ mt: "0.5em" }}>
        سرویس موقتا در دسترس نیست. لطفا دقایقی بعد تلاش کنید.
      </Typography>
    );
  }

  return (
    <Typography>
      {tooltipContent.map((content, index) => (
        <React.Fragment key={index}>{content}</React.Fragment>
      ))}
    </Typography>
  );
};


const GridItem: React.FC<{ data: WebsiteData }> = ({ data }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [activeGraphMobile, setActiveGraphMobile] = useState<number | null>(
    null
  );
  const [activeGraphDesktop, setActiveGraphDesktop] = useState<number | null>(
    null
  );
  const [tooltipTimer, setTooltipTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentActiveGraph, setCurrentActiveGraph] = useState<number | null>(null);

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
  const displayIndexes = [0, quarter, 2 * quarter, 3 * quarter, statusesCount - 1]

  const getFirstValidTimeForHour = (details: Details) => {
    const validDetail = details.find((detail: Detail) => detail.status === "200" || detail.status === "403");
    return validDetail ? validDetail.time : "N/A";
  };


  const statusLineStyle = (index: number) => ({
    "&::before": displayIndexes.includes(index) ? {
      content: '""',
      display: "block",
      width: "10%",
      height: "70px",
      backgroundColor: "#3f4145",
      position: "absolute",
      top: "-35px",
      left: "-1px",
    } : {}
  });

  return (
    <Grid
      xs={12}
      sx={{
        maxWidth: { md: "48%", lg: "31.7%" },
        borderRadius: "0.5rem",
        background: "#2B2E31",
        boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mx: "auto",
        my: "0.66em",
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
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: 600,
            fontSize: "0.9rem"
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
        width="65%"
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
          {data.hourly_status.slice(-24).map((hourlyStatus, index) => {
            const bgColor = getHourlyStatusColor(hourlyStatus.details);
            return (
              <Tooltip
                title={<Typography>{getTooltipMessage(hourlyStatus.details, bgColor)}</Typography>}
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
                    ...statusLineStyle(index)
                  }}
                />
              </Tooltip>
            );
          })}
          <Typography sx={{ transform: "rotate(-90deg)", fontSize: "9.574px", color: "#7A7775", position: "absolute", left: '-25px', top: "-10px" }}>
            Disorders
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          mt="0.5em"
        >
          {data.hourly_status.map((hourlyStatus, index) => {
            const shouldDisplayHour = displayIndexes.includes(index);
            return (
              <Box
                key={index}
                sx={{
                  width: shouldDisplayHour ? "auto" : "0px",
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {shouldDisplayHour && (
                  <Typography
                    sx={{
                      color: "#7A7775",
                      fontSize: "9.574px",
                      textAlign: "center",
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
        {serverStatusData ? (
          <Grid container rowSpacing={4} paddingY="1rem">
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
      <ModalNotData serverStatusData={serverStatusData} />
    </Box>
  );
};

export default GlobalOverview;
