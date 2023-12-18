import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Button,
  Tooltip,
  Typography,
  Modal,
  useMediaQuery,
  useTheme,
  // SxProps,
  // Theme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Link, useNavigate } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import serverStatusData from '../../../public/data/server_status.json';

// enum Time {
//   FiveMinutes = '5min',
//   TenMinutes = '10min',
//   TwentyMinutes = '20min'
// }

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
  const non200Count = hourlyDetails.filter(detail => parseInt(detail.status, 10) !== 200).length;
  if (non200Count > 4) return "#E93F3F";
  if (non200Count >= 2) return "#f19e2c";
  return "#7FCD9F";
};

const getTooltipMessage = (hourlyDetails: StatusDetail[], color: string) => {
  const non200Details = hourlyDetails.filter(detail => parseInt(detail.status, 10) !== 200);
  let tooltipContent = [];

  if (color === "#E93F3F") {
    const start = non200Details[0].time;
    const end = non200Details[non200Details.length - 1].time;
    tooltipContent.push(
      <Typography sx={{ color: color, fontSize: "1.3rem", py: "0.5em", px: "0.5em" }}>❌ قطعی کامل سرویس</Typography>,
      <Typography sx={{ bgcolor: '#2B2E31', p: "1em" }}>قطعی کامل سرویس از ساعت {start}  تا ساعت {end}</Typography>,
      <Typography sx={{ mt: "0.5em" }}>دسترسی به صورت موقت قطع شده است لطفا بعدا تلاش کنید.</Typography>
    );
  } else if (color === "#7FCD9F") {
    tooltipContent.push(
      <Typography sx={{ color: color, fontSize: "1.3rem", mt: "0.2em" }}>وضعیت : 200</Typography>,
      <Typography sx={{ bgcolor: '#2B2E31', py: "0.5em", px: "0.5em", color: color, fontSize: "1.3rem", mt: "0.2em" }}>✅ بدون قطعی</Typography>,
      <Typography sx={{ mt: "0.2em", mx: "0.2em" }}>درخواست با موفقیت انجام شد.</Typography>
    );
  } else if (color === "#f19e2c" && non200Details.length > 0) {
    const start = non200Details[0].time;
    const end = non200Details[non200Details.length - 1].time;
    tooltipContent.push(
      <Typography sx={{ color: color, fontSize: "1.3rem", my: "0.4rem" }}>⚠️ اختلال جزئی در اتصال</Typography>,
      <Typography sx={{ bgcolor: '#2B2E31', py: "0.5em", px: "0.5em" }}>اختلال جزئی از ساعت {start} تا ساعت {end}</Typography>,
      <Typography sx={{ mt: "0.5em" }}>سرویس موقتا در دسترس نیست. لطفا دقایقی بعد تلاش کنید.</Typography>
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

  return (
    <Grid
      xs={12}
      sx={{
        maxWidth: { md: "48%", lg: "31%" },
        borderRadius: "0.5rem",
        background: "#2B2E31",
        boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mx: "auto",
        my: "1.1em",
        px: "1em",
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="0.5rem" sx={{ textTransform: "uppercase" }}>
        <img
          src={`/images/${data.name}.svg`}
          alt={data.name}
          width={64}
          height={64}
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
        {data.hourly_status.slice(-24).map((hourlyStatus, index) => {
          const bgColor = getHourlyStatusColor(hourlyStatus.details);
          const statusMessage = getTooltipMessage(hourlyStatus.details, bgColor);

          return (
            <Tooltip
              key={index}
              title={<Typography>{statusMessage}</Typography>}
              arrow
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
                  }
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    </Grid>
  )
};

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

  // const [activeTime, setActiveTime] = useState<Time | null>(null);

  // const buttonStyles = (time: Time): SxProps<Theme> => ({
  //   borderRadius: "0.7em",
  //   bgcolor: activeTime === time ? '#fff' : '#000',
  //   color: activeTime === time ? '#2B2E31' : '#fff',
  //   mx: time === Time.TenMinutes ? '0.7em' : 0,
  // });

  // const times = [Time.FiveMinutes, Time.TenMinutes, Time.TwentyMinutes];

  return (
    <Box sx={{ bgcolor: 'transparent', background: 'linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)', px: "1em" }}>
      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: "center", pt: "1em" }}>
        {/* <Box sx={{ display: "flex", justifyContent: "space-between", mr: '1.2em' }}>
          {times.map(time => (
            <Button
              key={time}
              sx={buttonStyles(time)}
              onClick={() => setActiveTime(time)}
            >
              {time}
            </Button>
          ))}
        </Box> */}
        <Button
          component={Link}
          to="/"
          sx={{
            fontSize: "1.5rem",
            textDecoration: "none",
            textAlign: "center",
            width: "10%",
            color: "#FFF",
          }}
          endIcon={<WestIcon sx={{ marginRight: "1em" }} />}
        >
          بازگشت
        </Button>
      </Box>
      {
        dataLoaded ? (
          <Grid container rowSpacing={4} paddingY="1rem">
            {serverStatusData.map((serverData, index) => (
              <GridItem key={index} data={serverData} />
            ))}
          </Grid>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )
      }
    </Box >
  );
};

export default GlobalOverview;
