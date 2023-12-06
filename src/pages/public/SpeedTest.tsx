declare global {
  interface Window {
    speedtest: any;
  }
}

import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DownloadGrad from "../../assets/images/download-grad.png";
import UploadGrad from "../../assets/images/upload-grad.png";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import useFetchServers from "../../hooks/useFetchServers";
import PulsedNumber from "../../components/ui/PulsedNumber";

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

        //   if (dlProgress == 1 && ulProgress == 1) {
        //     const currentJalaliDateInEnglish = moment().format("jYYYY/jM/jD");
        //     const currentJalaliDateInFarsi = convertToPersianNumbers(
        //       currentJalaliDateInEnglish
        //     );

        //     const getCurrentTime = () => {
        //       const now = new Date();
        //       const hours = now.getHours().toString().padStart(2, "0");
        //       const minutes = now.getMinutes().toString().padStart(2, "0");
        //       const seconds = now.getSeconds().toString().padStart(2, "0");

        //       return `${hours}:${minutes}:${seconds}`;
        //     };

        //     const testResults = {
        //       date: currentJalaliDateInFarsi,
        //       englishDate: currentJalaliDateInEnglish,
        //       time: convertToPersianNumbers(getCurrentTime()),
        //       englishTime: getCurrentTime(),
        //       ping: convertToPersianNumbers(latency),
        //       download: convertToPersianNumbers(dlStatus),
        //       testDuration: convertToPersianNumbers("00:16"),
        //       testType: "دقیق",
        //       upload: convertToPersianNumbers(ulStatus),
        //       server: "ایرانسل-تهران",
        //       ip: clientIp,
        //     };
        //     const existingResults = JSON.parse(
        //       localStorage.getItem("testResults") || "[]"
        //     );
        //     existingResults.push(testResults);
        //     localStorage.setItem("testResults", JSON.stringify(existingResults));
        //     // setIsGoButtonVisible(true);
        //     setIsTestEnds(true);
        //   }
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
        alignItems: "center",
        justifyContent: "center",
        background: "#141526",
      }}
    >
      <Box
        onClick={handleStartTestClick}
        onMouseEnter={() => setHoverButton(true)}
        onMouseLeave={() => setHoverButton(false)}
        sx={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
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
            background: "linear-gradient(to bottom, cyan, #498dd6)",
            "-webkit-mask":
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            "-webkit-mask-composite": "xor",
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
            transform: "translateY(-40%)",
            zIndex: "1",
            fontSize: "3.5rem",
          }}
        >
          GO
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2px #26c5dd solid",
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
      </Box>

      {startAnimate && (
        <Box
          sx={{
            width: "380px",
            height: "380px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            borderRadius: "50%",
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
                background: "#141526",
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
                background: "#141526",
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
                  background: "#141526",
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
                  background: "#141526",
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
      )}
    </Box>
  );
};

export default SpeedTest;
