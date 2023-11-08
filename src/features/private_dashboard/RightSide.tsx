import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// import ArrowLeftGreen from "../../assets/images/arrow-left-green.svg";
import Ai from "../../assets/images/ai.svg";
import IspAndProvinces from "../../assets/images/isp-province.svg";
import WifiIcon from "../../assets/images/wifi.svg";
import Send from "../../assets/images/send.svg";
import BadgedValue from "./components/BadgedValue";
import {useState} from "react";
import InfoBox from "../../components/ui/InfoBox";

const aiMessages = [
  {
    id: 1,
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون ",
    time: "امروز 22:30",
  },
];

const RightSide = () => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gap: isXlgScreen ? "1.5rem" : "1rem",
        maxWidth: isXlgScreen ? "initial" : "19rem",
      }}
    >
      <InfoBox title="هوش مصنوعی" iconPath={Ai}>
        <Box
          sx={{
            padding: ".5rem",
            position: "relative",
            height: "100%",
          }}
        >
          {aiMessages.map((message) => (
            <Box key={message.id}>
              <Stack direction="row" alignItems="center" gap={0.5}>
                <img
                  src={Ai}
                  style={{
                    width: "13px",
                    height: "13px",
                  }}
                />
                <Typography>هوش مصنوعی</Typography>
                <Typography
                  sx={{
                    color: "#7A7775",
                    fontSize: ".5rem",
                  }}
                >
                  {message.time}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  color: "#FFF",
                  background: "#7A7775",
                  borderRadius: ".5rem",
                  borderTopRightRadius: "0",
                  padding: ".5rem",
                  fontSize: ".8rem",
                  width: "15rem",
                }}
              >
                {message.text}
              </Typography>
            </Box>
          ))}
          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submit");
              }}
            >
              <input
                style={{
                  background: "#232629",
                  color: "#FFF",
                  padding: ".4rem",
                  outline: "none",
                  border: "none",
                  height: "2rem",
                  borderRadius: ".5rem",
                  width: "95%",
                  marginTop: "auto",
                  position: "absolute",
                  bottom: ".2rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: "PeydaRegular",
                  caretColor: "#FFF",
                }}
                placeholder="پیام خود را بنویسید..."
              />
              <Button
                type="submit"
                sx={{
                  position: "absolute",
                  bottom: ".75rem",
                  left: "-.5rem",
                  padding: "0",
                  ":hover": {
                    background: "transparent",
                  },
                  "& .MuiTouchRipple-root": {
                    display: "none",
                  },
                }}
              >
                <img src={Send} />
              </Button>
            </form>
          </Box>
        </Box>
      </InfoBox>
      <InfoBox
        title="اپراتورها و استان‌ها"
        iconPath={IspAndProvinces}
        onClick={toggleDialog}
      >
        <></>
      </InfoBox>
      <InfoBox title="ترافیک فعلی (IXP,IGW)" iconPath={WifiIcon}>
        <Box
          sx={{
            padding: "1rem",
            paddingBottom: "0",
            display: "flex",
            flexDirection: "column",
            gap: isXlgScreen ? ".5rem" : "",
            marginY: "auto",
          }}
        >
          <BadgedValue badgeName="IGW" value={1490026} />
          <BadgedValue badgeName="IXP" value={2310026} />
        </Box>
      </InfoBox>
    </Box>
  );
};

export default RightSide;
