declare global {
  interface Window {
    speedtest: any;
  }
}

import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DownloadGrad from "../../assets/images/download-grad.png";
import UploadGrad from "../../assets/images/upload-grad.png";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import useFetchServers from "../../hooks/useFetchServers";
import PulsedNumber from "../../components/ui/PulsedNumber";
import earth from "../../assets/images/earth.svg";
import etesal from "../../assets/images/etesal.svg";
import person from "../../assets/images/person.svg";
import download_blue from "../../assets/images/download_blue.svg";
import download_green from "../../assets/images/download_green.svg";
import upload_purple from "../../assets/images/upload_purpel.svg";
import upload_Gray from "../../assets/images/uploadGray.svg";
import ping from "../../assets/images/ping.svg";
const STATUS_MAP = {
  READY: 2,
  RUNNING: 3,
  FINISH: 4,
};

const calculateAngleOfCarret = (value: number) => {
  if (value <= 1) {
    return -133.5 + value * 29;
  }

  if (value <= 5) {
    return -105.5 + (value / 5) * 25.5;
  }

  if (value <= 10) {
    return -80 + ((value - 5) / 5) * 35;
  }

  if (value <= 20) {
    return -45 + ((value - 10) / 10) * 45;
  }

  if (value <= 30) {
    return ((value - 20) / 10) * 45;
  }

  if (value <= 50) {
    return 45 + ((value - 30) / 20) * 35;
  }

  if (value <= 75) {
    return 80 + ((value - 50) / 25) * 27;
  }

  if (value <= 100) {
    return 107 + ((value - 75) / 25) * 30;
  }

  if (value > 100) return 137;
};

const SpeedTest = () => {
  const [hoverButton, setHoverButton] = useState<boolean>(false);
  const [startTest, setStartTest] = useState<boolean>(false);

  const [startAnimate, setStartAnimate] = useState(false);
  const [_status, setStatus] = useState(2);
  // const [isTestEnds, setIsTestEnds] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  const [_latency, setLatency] = useState(0);
  const [download, setDownload] = useState(0);
  const [_downloadProgress, setDownloadProgress] = useState(0);
  const [upload, setUpload] = useState(0);
  const [_uploadProgress, setUploadProgress] = useState(0);
  // const [testType, setTestType] = useState("تست دقیق");
  const [_testStateNumber, setTestStateNumber] = useState(0);
  const [isDl, setIsDl] = useState(true);
  const [_clientIp, setClientIp] = useState("");
  const { isFetchingServers, selectBestServer } = useFetchServers();
  const [selectedServerURL, setSelectedServerURL] = useState("");
  const [isServerSelected, setIsServerSelected] = useState(false);
  // const [openSelectServer, setOpenSelectServer] = useState(false);

  useEffect(() => {
    axios
      .get("https://server1.eyesp.live/get-ip")
      .then((res) => setClientIp(res.data.ip));
  }, []);

  const fetchServers = async () => {
    try {
      const response = await axios.get("https://server1.eyesp.live/servers");
      return response.data;
    } catch (error) {
      console.error("Error fetching servers:", error);
    }
  };

  const [_servers, setServers] = useState([]);

  useEffect(() => {
    const getServers = async () => {
      const serverData = await fetchServers();
      setServers(serverData);
    };

    getServers();
  }, []);

  useEffect(() => {
    if (selectedServerURL) {
      setIsServerSelected(true);
    }
  }, [selectedServerURL]);

  useEffect(() => {
    if (selectedServerURL) return;

    if (!isFetchingServers) {
      selectBestServer().then((url: string) => {
        if (url) {
          setSelectedServerURL(url);
        }
      });
    }
  }, [isFetchingServers, selectBestServer, selectedServerURL]);

  const PING_TIMES = 20;

  useEffect(() => {
    if (selectedServerURL === "") {
      return;
    }
    const s = socket || io(selectedServerURL);
    setSocket(s);

    s.on("connect", () => {
      console.log("Socket connected");
    });

    s.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      s.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServerURL]);

  useEffect(() => {
    if (!socket || !isServerSelected) return;
    let pingCount = 0,
      minLatency = Infinity;
    socket.on("pong_event", async (timestamp: number) => {
      const currentLatency = performance.now() - timestamp;
      minLatency = Math.min(minLatency, currentLatency);
      pingCount++;
      if (pingCount === PING_TIMES) {
        setLatency(+minLatency.toFixed(2));
      } else {
        socket.emit("ping_event", performance.now());
      }

      return;
    });
  }, [socket, isServerSelected]);

  const startPingTest = () => {
    if (!isServerSelected) return;
    socket && socket.emit("ping_event", performance.now());
  };

  const handleStartTestClick = () => {
    if (!isServerSelected) return;
    setStartAnimate(true);
    setTimeout(() => {
      setStartTest(true);
      startPingTest();
      handleStart();
    }, 3800);
  };

  let flag = true;

  const handleStart = () => {
    if (window.speedtest.getState() === STATUS_MAP.RUNNING) {
      return;
    } else {
      window.speedtest.onupdate = (data: any) => {
        const {
          dlProgress,
          dlStatus,
          ulProgress,
          ulStatus,
          // pingStatus,
          // jitterStatus,
          testState,
        } = data;
        setTestStateNumber(testState);
        if (isDl && flag) {
          setDownload(dlStatus);
          setDownloadProgress(dlProgress);
          if (dlProgress == 1) {
            setIsDl(false);
            flag = false;
          }
        }

        if (!isDl || dlProgress == 1) {
          setUpload(ulStatus);
          setUploadProgress(ulProgress);
        }
      };
      window.speedtest.onend = () => {
        setStatus(STATUS_MAP.READY);
      };
      setStatus(STATUS_MAP.RUNNING);
      window.speedtest.start();
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        background: "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)",
      }}
    >
      <Container
        onClick={handleStartTestClick}
        onMouseEnter={() => setHoverButton(true)}
        onMouseLeave={() => setHoverButton(false)}
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: { md: "10rem", xs: "5rem" },
          zIndex: "20",
          ":hover": {
            background: "#498dd615",
          },
          "::before": {
            padding: "3px",
            content: '""',
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "8px",
            background: "linear-gradient(to bottom, #1CC760, #7FCD9F)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          },

          animation: startAnimate ? "fadeOut 1s both" : "",
          "@keyframes fadeOut": {
            "0%": {
              opacity: 1,
            },

            "100%": {
              opacity: 0,
            },
          },
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: "1",
            fontSize: "3.5rem",
            opacity: ".7",
          }}
        >
          شروع
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px #7FCD9F solid",
            opacity: "0",
            animation: hoverButton ? "" : "startRing 3.5s 3.5s infinite linear",

            "@keyframes startRing": {
              "0%": {
                opacity: "0",
                transform: "scale(1)",
              },

              "12.5%": {
                opacity: "0",
                transform: "scale(.995)",
              },

              "16.66%": {
                opacity: "1",
              },

              "50%": {
                opacity: 0,
                transform: "scale(1.3)",
              },
            },
          }}
        />
      </Container>
      {!startAnimate && (
        <Container
          sx={{
            position: "absolute",
            bottom: "0",
            top: "60%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: { md: "6rem", xs: "3rem" },
            }}
          >
            {" "}
            <Stack direction="row" gap={3}>
              <img src={earth} alt="earth" />
              <Stack direction="column" gap={1}>
                <Typography variant="h1" color="white">
                  سرور مقصد
                </Typography>
                <Typography variant="h2" color="#57585A">
                  تهران-امام
                </Typography>
                <Typography variant="h3" color="#7FCD9F">
                  تغییر سرور
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              gap={3}
              sx={{ mr: { md: "0", xs: "0.8rem" } }}
            >
              <img src={person} alt="person" />
              <Stack direction="column" gap={1}>
                <Typography variant="h1" color="white">
                  همراه اول{" "}
                </Typography>
                <Typography variant="h2" color="#57585A">
                  51.15.57.153{" "}
                </Typography>
              </Stack>
            </Stack>{" "}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h2" color="#57585A">
              نوع اتصال
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: "2rem",
            }}
          >
            <Stack direction="row" alignItems="center" gap={2}>
              <Typography variant="h2" color="#57585A">
                تکی
              </Typography>
              <img src={etesal} alt="etesal" />
              <Typography variant="h2" color="#FFFFFF">
                چند تایی
              </Typography>
            </Stack>
          </Box>

          {/* Invisible Flex Breaker */}
        </Container>
      )}

      {startAnimate && (
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            // padding="2rem"
          >
            <Stack direction="row" gap={10}>
              <Stack direction="row" gap={1} alignItems="start">
                <img src={download_green} alt="download" />
                <Stack direction="column">
                  <Typography variant="h1" color="white">
                    دانلود
                  </Typography>
                  <Box
                    width="100%"
                    borderBottom="2px solid #57585A"
                    sx={{ marginTop: "1rem" }}
                  />
                </Stack>

                <Typography variant="h1" color="#57585A">
                  Mbps
                </Typography>
              </Stack>
              <Stack direction="row" gap={1} alignItems="start">
                <img src={upload_Gray} alt="download" />
                <Stack direction="column">
                  <Typography variant="h1" color="white">
                    آپلود{" "}
                  </Typography>
                  <Box
                    width="100%"
                    borderBottom="2px solid #57585A"
                    sx={{ marginTop: "1rem" }}
                  />{" "}
                </Stack>

                <Typography variant="h1" color="#57585A">
                  Mbps
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="start"
              alignItems="center"
              gap={4}
              mt={5}
            >
              <Stack direction="row" justifyContent="start" alignItems="center">
                {" "}
                <Typography variant="h1" color="white">
                  پینگ
                </Typography>{" "}
                <Typography variant="h2" color="#57585A" mr={1}>
                  ms
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="start"
                alignItems="center"
                gap={2}
              >
                <img src={ping} alt="ping" />
                <Typography variant="h1" color="white">
                  62{" "}
                </Typography>
                <img src={download_blue} alt="download" />
                <Typography variant="h1" color="white">
                  62{" "}
                </Typography>
                <img src={upload_purple} alt="upload" />
                <Typography variant="h1" color="white">
                  62{" "}
                </Typography>
              </Stack>
            </Stack>
          </Box>
          <Box
            sx={{
              width: "375px",
              height: "380px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
              position: "relative",
              borderRadius: "50%",
              marginTop: "1rem",
              // padding: "2rem",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "375px",
                height: "375px",
                borderRadius: "50%",
                border: "#232f4e 30px solid",
                background: "#232f4e",
                zIndex: "50",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                animation:
                  "scaleOut .5s .8s both, fadeBorderBottom .3s 1.6s both",

                "@keyframes scaleOut": {
                  "0%": {
                    transform: "scale(.5)",
                    opacity: "0",
                  },

                  "100%": {
                    transform: "scale(1)",
                    opacity: "1",
                  },
                },
                "@keyframes fadeBorderBottom": {
                  "0%": {
                    borderBottomColor: "transparent",
                  },

                  "100%": {
                    borderBlockEndColor: "#141526",
                  },
                },

                "&::after": {
                  content: '""',
                  position: "absolute",
                  height: "90px",
                  width: "80%",
                  bottom: "-30px",
                  left: "50%",
                  borderTopRightRadius: "50%",
                  borderTopLeftRadius: "50%",
                  background: "#0F1114",
                  zIndex: "15",
                  animation: "borderFadeIn .3s 1.3s both",
                  "@keyframes borderFadeIn": {
                    "0%": {
                      left: "50%",
                      width: "0",
                    },

                    "100%": {
                      left: "7%",
                      width: "86%",
                    },
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "0",
                  height: "0",
                  background: "#0F1114",
                  zIndex: "10",
                  borderRadius: "50%",
                  animation: "fadeInsideOut .3s 1s ease-in both",
                  "@keyframes fadeInsideOut": {
                    "0%": {
                      width: "0",
                      height: "0",
                    },

                    "100%": {
                      width: "100%",
                      height: "100%",
                    },
                  },
                }}
              />
              <Box
                sx={{
                  zIndex: "20",
                  position: "absolute",
                  left: "3rem",
                  bottom: "2.5rem",
                }}
              >
                <PulsedNumber
                  animationDelay={1.9}
                  value={isDl ? download : upload}
                  displayValue={0}
                  showNumber={startTest}
                />
              </Box>
              <Box
                sx={{
                  zIndex: "20",
                  position: "absolute",
                  left: "1rem",
                  bottom: "6rem",
                }}
              >
                <PulsedNumber
                  animationDelay={2}
                  value={isDl ? download : upload}
                  displayValue={1}
                  showNumber={startTest}
                />
              </Box>
              <Box
                sx={{
                  zIndex: "20",
                  position: "absolute",
                  left: "1rem",
                  bottom: "10rem",
                }}
              >
                <PulsedNumber
                  animationDelay={2.1}
                  value={isDl ? download : upload}
                  displayValue={5}
                  showNumber={startTest}
                />
              </Box>
              <Box
                sx={{
                  zIndex: "20",
                  position: "absolute",
                  left: "3.2rem",
                  bottom: "14.5rem",
                }}
              >
                <PulsedNumber
                  animationDelay={2.2}
                  value={isDl ? download : upload}
                  displayValue={10}
                  showNumber={startTest}
                />
              </Box>
              <Box
                sx={{
                  zIndex: "20",
                  position: "absolute",
                  left: "9rem",
                  bottom: "17rem",
                }}
              >
                <PulsedNumber
                  animationDelay={2.3}
                  value={isDl ? download : upload}
                  displayValue={20}
                  showNumber={startTest}
                />
              </Box>
              <Box
                sx={{
                  zIndex: "20",
                  position: "absolute",
                  left: "15rem",
                  bottom: "14.5rem",
                }}
              >
                <PulsedNumber
                  animationDelay={2.4}
                  value={isDl ? download : upload}
                  displayValue={30}
                  showNumber={startTest}
                />
              </Box>
              <Box
                sx={{
                  zIndex: "20",
                  position: "absolute",
                  left: "17rem",
                  bottom: "10rem",
                }}
              >
                <PulsedNumber
                  animationDelay={2.5}
                  value={isDl ? download : upload}
                  displayValue={50}
                  showNumber={startTest}
                />
              </Box>
              <Box
                sx={{
                  zIndex: "20",
                  position: "absolute",
                  left: "17rem",
                  bottom: "6rem",
                }}
              >
                <PulsedNumber
                  animationDelay={2.6}
                  value={isDl ? download : upload}
                  displayValue={75}
                  showNumber={startTest}
                />
              </Box>
              <Box
                sx={{
                  zIndex: "20",
                  position: "absolute",
                  left: "14rem",
                  bottom: "2.5rem",
                }}
              >
                <PulsedNumber
                  animationDelay={2.7}
                  value={isDl ? download : upload}
                  displayValue={100}
                  showNumber={startTest}
                />
              </Box>

              <Box
                sx={{
                  zIndex: "20",
                  width: "22px",
                  height: "120px",
                  background:
                    "linear-gradient(to bottom, #fff 0, #232f4e 80%, transparent 100%)",
                  position: "absolute",
                  top: "2.5rem",
                  clipPath: "polygon(25% 0, 0 100%, 100% 100%, 75% 0)",
                  transform: `rotate(${calculateAngleOfCarret(
                    isDl ? download || 0 : upload || 0
                  )}deg)`,
                  transformOrigin: "50% 100%",
                  transition: "transform .2s ease",
                  animation: "showUp .5s 2s both",

                  "@keyframes showUp": {
                    "0%": {
                      opacity: 0,
                    },

                    "100%": {
                      opacity: 1,
                    },
                  },
                }}
              />
              <Box
                sx={{
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    background: "#0F1114",
                    transform: "rotate(45deg)",
                    width: "50px",
                    height: "80px",
                    bottom: "-1rem",
                    left: "2.1rem",
                    zIndex: "10",
                  },

                  "&::before": {
                    content: '""',
                    position: "absolute",
                    background: "#0F1114",
                    transform: "rotate(45deg)",
                    width: "50px",
                    height: "40px",
                    bottom: "0rem",
                    right: "1.3rem",
                    zIndex: "10",
                  },
                  animation: "showUp 1s 4s both",
                  zIndex: "10",

                  "@keyframes showUp": {
                    "0%": {
                      opacity: "0",
                    },

                    "100%": {
                      opacity: "1",
                    },
                  },
                }}
              >
                <img
                  alt="isdl"
                  src={isDl ? DownloadGrad : UploadGrad}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "-5",
                    width: "380px",
                    height: "380px",
                    clipPath: "circle(41% at 24% 100%)",
                    // clipPath: "circle(35% at 33% 100%)",
                    // clipPath: "circle(50% at 51.0% 100%)",
                    transition: "clip-path .1s ease-in-out",
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    borderRadius: "50%",
                    width: "380px",
                    height: "380px",
                    top: "50%",
                    left: "50%",
                    // border: "80px solid red",
                    borderBottomColor: "transparent",
                    transform: "translate(-50%, -50%) rotate(120deg)",
                    zIndex: "18",
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: { md: "6rem", xs: "3rem" },
              // padding: "2rem",
            }}
          >
            {" "}
            <Stack direction="row" gap={3}>
              <img src={earth} alt="earth" />
              <Stack direction="column" gap={1}>
                <Typography variant="h1" color="white">
                  سرور مقصد
                </Typography>
                <Typography variant="h2" color="#57585A">
                  تهران-امام
                </Typography>
                <Typography variant="h3" color="#7FCD9F">
                  تغییر سرور
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" gap={3}>
              <img src={person} alt="person" />
              <Stack direction="column" gap={1}>
                <Typography variant="h1" color="white">
                  همراه اول{" "}
                </Typography>
                <Typography variant="h2" color="#57585A">
                  51.15.57.153{" "}
                </Typography>
              </Stack>
            </Stack>{" "}
          </Box>{" "}
        </Box>
      )}
    </Box>
  );
};

export default SpeedTest;
