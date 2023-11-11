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
import TaggedNumber from "./components/TaggedNumber";
import CircleChart from "../../components/ui/CircularChart";
import InfoBox from "../../components/ui/InfoBox";
import {Fragment} from "react";
import {Link} from "react-router-dom";

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

const LeftSide = () => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  const isMDScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gap: isXlgScreen ? "1.5rem" : "1rem",
        maxWidth: isXlgScreen ? "initial" : "19rem",
        justifySelf: isMDScreen ? "start" : "",
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
                  whiteSpace="nowrap"
                  alignItems="center"
                  gap="1rem"
                >
                  <Typography
                    sx={{
                      fontSize: ".7rem",
                    }}
                  >
                    {conflict.title}
                  </Typography>
                  <Button
                    sx={{
                      color: "#fff",
                      fontSize: ".6rem",
                      background: "#7A7775",
                      paddingY: ".2rem",
                      borderRadius: ".5rem",
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
                  گزارش خطا در اطلاعات
                </Typography>
              </Stack>
            </Button>
            <Button>
              <Link to="/disorders">
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
      <InfoBox title="تاریخچه اطلاعات" iconPath={HistoryInfo}>
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
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
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
          to="/isp"
          sx={{
            cursor: "pointer",
            alignItems: "center",
            marginX: "1rem",
            justifyContent: "space-between",
            ":active": {
              textDecoration: "none",
            },
          }}
        >
          <Button sx={{color: "#7FCD9F"}}>مشاهده جذئیات بیشتر</Button>
          <img
            src={ArrowLeftGreen}
            style={{
              marginLeft: "1rem",
            }}
          />
        </Stack>
      </InfoBox>
      <InfoBox title="میانگین کلی" iconPath={Average}>
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
              size={90}
              textTitle="میانگین سرعت دانلود"
              value={15}
              unit="Mbps"
            />
            <CircleChart
              finalPercentage={40}
              size={90}
              textTitle="میانگین سرعت آپلود"
              value={10}
              unit="Mbps"
            />
            <CircleChart
              finalPercentage={52}
              size={90}
              textTitle="میانگین پینگ"
              value={10}
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
