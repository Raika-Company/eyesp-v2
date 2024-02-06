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
import ArrowLeftGreen from "../../assets/images/arrow-left-green.svg";
import WifiIcon from "../../assets/images/wifi.svg";
import Send from "../../assets/images/send.svg";
import { FormEvent, useEffect, useRef, useState } from "react";
import InfoBox from "../../components/ui/InfoBox";
import { InternalISPList } from "../dashboard/LeftSide";
import { Link } from "react-router-dom";
import ISPList from "../dashboard/ـcomponents/ISPList";
import BadgedValue from "../dashboard/ـcomponents/BadgedValue";

const aiMessages = [
  {
    id: 1,
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون ",
    time: "امروز 22:30",
    isAi: true,
  },
];

const RightSide = () => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMdScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [isDialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => {
    setDialogOpen(!isDialogOpen);
  };

  // Functionality for Chat with ai
  const chatRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] =
    useState<{ id: number; text: string; time: string; isAi: boolean }[]>(
      aiMessages
    );

  const [enteredMessage, setEnteredMessage] = useState<string>("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: messages.length + 1,
        text: enteredMessage,
        time: `${new Date().getHours()}:${new Date().getMinutes()} امروز`,
        isAi: false,
      },
    ]);
    setEnteredMessage("");
  };

  // For scrolling to the bottom of it's content
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current?.scrollHeight;
  }, [messages]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "grid",
        gridTemplateColumns:
          isMdScreen && !isSmScreen && !isLgScreen ? "1fr 1fr 1fr" : "1fr",
        gridTemplateRows:
          isMdScreen && !isSmScreen && !isLgScreen ? "1fr" : "1fr 1fr 1fr",
        gap: isXlgScreen ? "1.5rem" : "1rem",
        minWidth: "17rem",
      }}
    >
      <InfoBox title="هوش مصنوعی" iconPath={Ai}>
        <Button
          sx={{
            position: "absolute",
            left: ".5rem",
            fontSize: ".8rem !important",
            top: ".25rem",
          }}
          onClick={() => setMessages([])}
        >
          پاک کردن همه
        </Button>
        <Box
          sx={{
            padding: ".5rem",
            position: "relative",
            height: "100%",
          }}
        >
          <Box
            ref={chatRef}
            sx={{
              overflowY: "auto",
              maxHeight: "10rem",
              paddingBottom: isSmScreen ? "2rem" : ".5rem",
            }}
          >
            {messages.map((message) => (
              <Box key={message.id}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: message.isAi ? "row" : "row-reverse",
                    alignItems: "center",
                    gap: ".5rem",
                    marginRight: "auto",
                  }}
                >
                  {message.isAi && (
                    <img
                      src={Ai}
                      style={{
                        width: "13px",
                        height: "13px",
                      }}
                    />
                  )}
                  <Typography>
                    {message.isAi ? "هوش مصنوعی" : "کاربر"}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#7A7775",
                      fontSize: ".5rem",
                    }}
                  >
                    {message.time}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    marginX: ".5rem",
                    color: "#FFF",
                    background: "#7A7775",
                    borderRadius: ".5rem",
                    borderTopRightRadius: message.isAi ? "0" : ".5rem",
                    borderTopLeftRadius: message.isAi ? ".5rem" : "0",
                    padding: ".5rem",
                    fontSize: ".8rem !important",
                  }}
                >
                  {message.text}
                </Typography>
              </Box>
            ))}
          </Box>
          <form onSubmit={handleSubmit}>
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
              onChange={(e) => setEnteredMessage(e.target.value)}
              value={enteredMessage}
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
      </InfoBox>
      <InfoBox
        title="اپراتورها و استان‌ها"
        iconPath={IspAndProvinces}
        onClick={toggleDialog}
      >
        <ISPList
          style={{ direction: "ltr" }}
          isp={InternalISPList}
          isLimited={true}
        />
        <Stack
          direction="row"
          component={Link}
          to="/private/operators"
          sx={{
            textDecoration: "none",
            cursor: "pointer",
            alignItems: "center",
            marginX: "1rem",
            justifyContent: "space-between",
            ":active": {
              textDecoration: "none",
            },
          }}
        >
          <Button sx={{ color: "#7FCD9F" }}>مشاهده جذئیات بیشتر</Button>
          <img
            src={ArrowLeftGreen}
            style={{
              marginLeft: "1rem",
            }}
          />
        </Stack>
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
