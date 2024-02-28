/**
 * Extend the global Window interface to include a custom property 'speedtest'.
 */
declare global {
  interface Window {
    speedtest: any;
  }
}

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DownloadGrad from "../../assets/images/donwload-grad.svg";
import UploadGrad from "../../assets/images/upload-grad.png";
import axios from "axios";
import { Socket, io } from "socket.io-client";
import useFetchServers from "../../hooks/useFetchServers";
import PulsedNumber from "../../components/ui/PulsedNumber";
import earth from "../../assets/images/earth.svg";
import person from "../../assets/images/person.svg";
import download_blue from "../../assets/images/download_blue.svg";
import download_green from "../../assets/images/download_green.svg";
import upload_purple from "../../assets/images/upload_purpel.svg";
import upload_Gray from "../../assets/images/uploadGray.svg";
import ping from "../../assets/images/ping.svg";
import donwload_gray from "../../assets/images/download-gray.svg";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";
import moment from "moment-jalaali";
import { convertToPersianNumbers } from "../../utils/convertToPersianNumbers";
import AnimatingNumber from "./AnimatingNumber";
import SwitchBtn from "./SwitchBtn";
import etesal from "../../assets/images/etesal.svg";

/**
 * Enum representing status codes for the speed test.
 */
const STATUS_MAP = {
  READY: 2,
  RUNNING: 3,
  FINISH: 4,
};

/**
 * Calculates the angle of the caret based on the given value.
 * @param value - The value for which the angle needs to be calculated.
 * @returns The calculated angle of the caret.
 */
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

/**
 * Functional component representing the Speed Test.
 *
 * The `SpeedTest` component is responsible for rendering and managing the user interface
 * for conducting speed tests. It utilizes various state variables, effects, and helper functions
 * to handle interactions, display real-time results, and communicate with the server for testing.
 * The component includes UI elements, animations, and logic for both download and upload speed tests.
 *
 * It incorporates external dependencies such as MUI (Material-UI), Axios for HTTP requests,
 * and Socket.IO for real-time communication with the server. Additionally, the component relies
 * on custom hooks, such as `useFetchServers`, to fetch and manage server information for testing.
 *
 * The speed test process involves several stages, including selecting the best server, establishing
 * a connection, and measuring latency, download, and upload speeds. The component utilizes socket events
 * for communication with the server during the test, and it updates the UI based on the test progress.
 *
 * The UI elements include interactive buttons, server information, and dynamic animations to enhance
 * the user experience. The component handles various states, such as ready, running, afnd finished,
 * to ensure a smooth and informative testing process.
 *
 * Overall, the `SpeedTest` component encapsulates the entire speed testing functionality within a
 * React functional component, providing a clear structure and encapsulation for speed testing
 * capabilities in a larger application.
 */
interface AddressIPProps {
  ip: string;
}

const AddressIP: React.FC<AddressIPProps> = ({ ip }) => {
  return (
    <Box>
      <Stack direction="row">
        <Typography
          component="span"
          variant="h5"
          color="text.main"
          marginX="0.5rem"
        >
          {ip === "" ? "در حال پیدا کردن ip" : ip}
        </Typography>
      </Stack>
    </Box>
  );
};
interface AddressServerProps {
  server: string;
}

const AddressServer: React.FC<AddressServerProps> = ({ server }) => {
  return (
    <Box>
      <Stack direction="row">
        <Typography
          component="span"
          variant="h5"
          color="text.main"
          marginX="0.5rem"
        >
          {server === "" ? "در حال انتخاب سرور" : "تهران - زیرساخت"}
        </Typography>
      </Stack>
    </Box>
  );
};

const SpeedTest = () => {
  const [hoverButton, setHoverButton] = useState<boolean>(false);
  const [startTest, setStartTest] = useState<boolean>(false);

  const [startAnimate, setStartAnimate] = useState(false);
  const [_status, setStatus] = useState(2);
  const [isTestEnds, setIsTestEnds] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  const [latency, setLatency] = useState(0);
  const [download, setDownload] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [upload, setUpload] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [testType, setTestType] = useState("تست دقیق");
  const [testStateNumber, setTestStateNumber] = useState(0);
  const [isDl, setIsDl] = useState(true);
  const [clientIp, setClientIp] = useState("");
  const { isFetchingServers, selectBestServer } = useFetchServers();
  const [selectedServerURL, setSelectedServerURL] = useState("");
  const [isServerSelected, setIsServerSelected] = useState(false);

  function interpolateClipPath(angle: number | undefined) {
    // Define the known angles and their corresponding clipPath attributes
    const angleClipPathMap = [
      { angle: -133.5, y: 275, borderRadius: 34 },
      { angle: -99.584, y: 211, borderRadius: 0 },
      // Add other known points here
      { angle: 26.34, y: -15.84, borderRadius: 16.36 },
    ];

    // Sort by angle to ensure correct interpolation order
    angleClipPathMap.sort((a, b) => a.angle - b.angle);

    // Find the closest lower and upper bounds for the given angle
    let lowerBound = null;
    let upperBound = null;
    for (const point of angleClipPathMap) {
      if (angle !== undefined) {
        if (angle >= point.angle) {
          lowerBound = point;
        } else {
          upperBound = point;
          break; // Found the immediate upper bound, exit loop
        }
      }
    }

    // If angle is outside the known ranges, handle edge cases
    if (!lowerBound || !upperBound) {
      // Return a default or edge case clipPath
      return "defaultClipPath";
    }

    // Interpolate y and borderRadius between lowerBound and upperBound
    if (angle !== undefined) {
      const fraction =
        (angle - lowerBound.angle) / (upperBound.angle - lowerBound.angle);
      const interpolatedY =
        lowerBound.y + fraction * (upperBound.y - lowerBound.y);
      const interpolatedBorderRadius =
        lowerBound.borderRadius +
        fraction * (upperBound.borderRadius - lowerBound.borderRadius);

      // Construct and return the interpolated clipPath string
      return `xywh(0 ${interpolatedY}px 50% 96% round ${interpolatedBorderRadius}% 0)`;
    }
  }

  // Example usage
  const clipPath = interpolateClipPath(
    calculateAngleOfCarret(download || upload || 0)
  );

  /**
   * Fetches the client's IP address from an external server.
   */
  useEffect(() => {
    axios.get("http://95.38.58.11:3000/get-ip").then((res) => {
      setClientIp(res.data.response_ip_address);
    });
  }, []);

  const fetchServers = async () => {
    try {
      const response = await axios.get("https://server1.eyesp.live/servers");
      return response.data;
    } catch (error) {
      console.error("Error fetching servers:", error);
    }
  };

  const [servers, setServers] = useState([]);

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

  /**
   * Handles the click event when starting the speed test.
   *
   * Initiates the speed test process by triggering animations, starting the ping test,
   * and calling the main speed test function (`handleStart`).
   */
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
        if (dlProgress == 1 && ulProgress == 1) {
          const currentJalaliDateInEnglish = moment().format("jYYYY/jM/jD");
          const currentJalaliDateInFarsi = convertToPersianNumbers(
            currentJalaliDateInEnglish
          );

          const getCurrentTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const seconds = now.getSeconds().toString().padStart(2, "0");

            return `${hours}:${minutes}:${seconds}`;
          };

          const testResults = {
            date: currentJalaliDateInFarsi,
            englishDate: currentJalaliDateInEnglish,
            time: convertToPersianNumbers(getCurrentTime()),
            englishTime: getCurrentTime(),
            ping: convertToPersianNumbers(latency),
            download: convertToPersianNumbers(dlStatus),
            testDuration: convertToPersianNumbers("00:16"),
            testType: "دقیق",
            upload: convertToPersianNumbers(ulStatus),
            server: "ایرانسل-تهران",
            ip: clientIp,
          };
          const existingResults = JSON.parse(
            localStorage.getItem("testResults") || "[]"
          );
          existingResults.push(testResults);
          localStorage.setItem("testResults", JSON.stringify(existingResults));
          // setIsGoButtonVisible(true);
          setIsTestEnds(true);
        }
      };
      window.speedtest.onend = () => {
        setStatus(STATUS_MAP.READY);
      };
      setStatus(STATUS_MAP.RUNNING);
      window.speedtest.start();
    }
  };
  //resultTest

  const detailResult = [
    {
      imgSrc: etesal,
      title: "نوع اتصال",
      subtitle: testType,
    },
    {
      imgSrc: person,
      title: "همراه اول",
      subtitle: clientIp,
    },
    {
      imgSrc: earth,
      title: "سرور مقصد",
      subtitle: "تهران-زیرساخت",
    },
  ];
  // Final results including download and upload rates
  const finalResult = [
    {
      id: 1,
      downloadRate: download,
      image: download_green,
    },
    {
      id: 2,
      downloadRate: upload,
      image: upload_purple,
    },
  ];

  const restartTest = (): void => {
    setIsTestEnds(false);
    setStartAnimate(true);

    setStartTest(false);
    setStatus(STATUS_MAP.READY);
    setDownload(0);
    setUpload(0);
  };

  interface ResultTestProps {
    onRestartTest: () => void;
  }
  const ResultTest: React.FC<ResultTestProps> = ({ onRestartTest }) => {
    return (
      <Box
        sx={{
          background: "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)",
          height: "100dvh",
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        {" "}
        <Container>
          <Box
            display="flex"
            height="100dvh"
            overflow="auto"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            gap={13}
            padding={3}
          >
            <Stack direction="row">
              <Box
                onClick={onRestartTest}
                onMouseEnter={() => setHoverButton(true)}
                onMouseLeave={() => setHoverButton(false)}
                sx={{
                  width: { lg: "300px", md: "400px", xs: "300px" },
                  height: { lg: "300px", md: "400px", xs: "300px" },
                  borderRadius: "50%",
                  display: "flex",
                  position: "relative",
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
                    fontSize: "3.5rem",
                    opacity: ".7",
                  }}
                >
                  شروع
                </Typography>
                <Box
                  sx={{
                    position: "absolute",

                    width: { lg: "300px", md: "400px", xs: "300px" },
                    height: { lg: "300px", md: "400px", xs: "300px" },
                    borderRadius: "50%",
                    border: "2px #7FCD9F solid",
                    opacity: "0",
                    animation: hoverButton
                      ? ""
                      : "startRing 3.5s 3.5s infinite linear",

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
            </Stack>{" "}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
              gap={8}
            >
              {detailResult.map((item, index) => (
                <Stack key={index} direction="row" gap={4} alignItems="center">
                  <img src={item.imgSrc} alt="img" />
                  <Stack direction="column" alignItems="center" gap={1}>
                    <Typography variant="h2" color="white">
                      {item.title}
                    </Typography>
                    <Typography variant="h3" color="#57585A">
                      {item.subtitle}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="start"
              alignItems="start"
              gap={13}
            >
              {finalResult.map((item) => (
                <Stack
                  key={item.id}
                  direction="column"
                  gap={2}
                  alignItems="center"
                >
                  <Stack direction="row" gap={2} alignItems="center">
                    <img src={item.image} alt="download" />
                    <Typography variant="h2" color="white">
                      دانلود
                    </Typography>
                    <Typography variant="h3" color="#57585A">
                      Mbps
                    </Typography>
                  </Stack>
                  <Typography variant="h2" color="white">
                    {item.downloadRate}
                  </Typography>
                </Stack>
              ))}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={5}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h1" color="white">
                  پینگ
                </Typography>
                <Typography variant="h3" color="#57585A">
                  ms
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                <img src={ping} alt="ping" />
                <Typography variant="h2" color="white">
                  {latency}
                </Typography>
              </Stack>{" "}
            </Box>
          </Box>
        </Container>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        background: "linear-gradient(252deg, #2C2E32 0.73%, #0F1114 39.56%)",
      }}
    >
      <Container>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="end"
          alignItems="center"
          width="90%"
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
            }}
            endIcon={<WestIcon sx={{ marginRight: "1em" }} />}
          >
            بازگشت
          </Button>
        </Box>
      </Container>

      {!startAnimate && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            onClick={handleStartTestClick}
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            sx={{
              width: { lg: "300px", md: "400px", xs: "300px" },
              height: { lg: "300px", md: "400px", xs: "300px" },
              borderRadius: "50%",
              display: "flex",
              position: "relative",
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
                fontSize: "3.5rem",
                opacity: ".7",
              }}
            >
              شروع
            </Typography>
            <Box
              sx={{
                position: "absolute",

                width: { lg: "300px", md: "400px", xs: "300px" },
                height: { lg: "300px", md: "400px", xs: "300px" },
                borderRadius: "50%",
                border: "2px #7FCD9F solid",
                opacity: "0",
                animation: hoverButton
                  ? ""
                  : "startRing 3.5s 3.5s infinite linear",

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
          <Box
            sx={{
              marginTop: "2rem",
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
              <Stack direction="row" gap={3}>
                <img src={earth} alt="earth" />
                <Stack direction="column" gap={1}>
                  <Typography variant="h1" color="white">
                    سرور مقصد
                  </Typography>
                  <AddressServer server={selectedServerURL} />
                  {/* <Typography variant="h3" color="#7FCD9F">
                    تغییر سرور
                  </Typography> */}
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
                  <AddressIP ip={clientIp} />
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
              <SwitchBtn
                textOn="تست دقیق"
                textOff="تست فوری"
                onChange={setTestType}
              />{" "}
            </Box>

            {/* Invisible Flex Breaker */}
          </Box>
        </Box>
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
              {isDl && (
                <>
                  <Stack direction="row" gap={1} alignItems="start">
                    <img src={download_green} alt="download" />
                    <Stack direction="column">
                      <Typography variant="h1" color="white">
                        دانلود
                      </Typography>
                      <Box
                        width="100%"
                        borderBottom="2px solid #FFFFFF"
                        sx={{ marginTop: "1rem" }}
                      />
                    </Stack>

                    <Typography variant="h1" color="white">
                      Mbps
                    </Typography>
                  </Stack>
                  <Stack direction="row" gap={1} alignItems="start">
                    <img src={upload_Gray} alt="download" />
                    <Stack direction="column">
                      <Typography
                        variant="h1"
                        color="white"
                        sx={{ opacity: "0.5" }}
                      >
                        آپلود{" "}
                      </Typography>
                      <Box
                        width="100%"
                        borderBottom="2px solid #57585A"
                        sx={{ marginTop: "1rem", opacity: "0.5" }}
                      />{" "}
                    </Stack>

                    <Typography variant="h1" color="#57585A">
                      Mbps
                    </Typography>
                  </Stack>
                </>
              )}{" "}
              {!isDl && (
                <>
                  <Stack direction="row" gap={1} alignItems="start">
                    <img src={donwload_gray} alt="download" />
                    <Stack direction="column">
                      <Typography
                        variant="h1"
                        color="white"
                        sx={{ opacity: "0.5" }}
                      >
                        دانلود
                      </Typography>
                      <Box
                        width="100%"
                        borderBottom="2px solid #57585A"
                        sx={{ marginTop: "1rem", opacity: "0.5" }}
                      />
                    </Stack>

                    <Typography variant="h1" color="#57585A">
                      Mbps
                    </Typography>
                  </Stack>
                  <Stack direction="row" gap={1} alignItems="start">
                    <img src={upload_purple} alt="download" />
                    <Stack direction="column">
                      <Typography variant="h1" color="white">
                        آپلود{" "}
                      </Typography>
                      <Box
                        width="100%"
                        borderBottom="2px solid #FFFFFF"
                        sx={{ marginTop: "1rem" }}
                      />{" "}
                    </Stack>

                    <Typography variant="h1" color="white">
                      Mbps
                    </Typography>
                  </Stack>
                </>
              )}
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
                  {latency}{" "}
                </Typography>
                <Stack direction="row" gap=".8rem">
                  <img
                    src={download_blue}
                    alt="download"
                    style={{ width: "1.2rem", marginTop: "-.2rem" }}
                  />
                  <AnimatingNumber value={download} />
                </Stack>
                <Stack direction="row" gap=".8rem">
                  <img
                    src={upload_purple}
                    alt="upload"
                    style={{ width: "1.2rem", marginTop: "-.2rem" }}
                  />
                  <AnimatingNumber value={upload} />
                </Stack>
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
                    clipPath: clipPath,
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
                <AddressServer server={selectedServerURL} />

                {/* <Typography variant="h3" color="#7FCD9F">
                  تغییر سرور
                </Typography> */}
              </Stack>
            </Stack>
            <Stack direction="row" gap={3}>
              <img src={person} alt="person" />
              <Stack direction="column" gap={1}>
                <Typography variant="h1" color="white">
                  همراه اول{" "}
                </Typography>
                <AddressIP ip={clientIp} />
              </Stack>
            </Stack>{" "}
          </Box>{" "}
        </Box>
      )}
    </Box>
    // <ResultTest onRestartTest={restartTest} />
  );
};

export default SpeedTest;
