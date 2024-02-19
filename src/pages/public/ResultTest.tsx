import { Box, Container, Stack, Typography } from "@mui/material";
import go from "../../assets/images/go.png";
import etesal from "../../assets/images/etesal.svg";
import earth from "../../assets/images/earth.svg";
import person from "../../assets/images/person.svg";
import download_green from "../../assets/images/download_green.svg";
import upload_purple from "../../assets/images/upload_purpel.svg";
import ping from "../../assets/images/ping.svg";

/**
 * Functional component representing the result display after the speed test.
 *
 * The `ResultTest` component is responsible for rendering the results of the speed test,
 * including details about the connection, server information, and final download/upload rates.
 * It uses Material-UI components for styling and layout, creating an aesthetically pleasing
 * and informative result display.
 */
const ResultTest = () => {
  // Details about the connection and server
  const detail = [
    {
      imgSrc: etesal,
      title: "نوع اتصال",
      subtitle: "چند تایی",
    },
    {
      imgSrc: person,
      title: "نوع اتصال",
      subtitle: "چند تایی",
    },
    {
      imgSrc: earth,
      title: "سرور مقصد",
      subtitle: "تهران-امام",
    },
  ];
  // Final results including download and upload rates
  const finalResult = [
    {
      id: 1,
      downloadRate: "7.5",
      image: download_green,
    },
    {
      id: 2,
      downloadRate: "7.5",
      image: upload_purple,
    },
    // Add more items as needed
  ];
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
            <img src={go} alt="go" />
          </Stack>{" "}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
            gap={8}
          >
            {detail.map((item, index) => (
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
                62
              </Typography>
            </Stack>{" "}
            <Stack direction="row" alignItems="center" gap={2}>
              <img src={download_green} alt="download_green" />
              <Typography variant="h2" color="white">
                62
              </Typography>{" "}
              <img src={upload_purple} alt="upload_purple" />
              <Typography variant="h2" color="white">
                62
              </Typography>
            </Stack>{" "}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ResultTest;
