import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect } from "react";
import { GetGlobalOverview } from "../services/GlobalOverview";

type HistoryItem = {
  status: number;
  check_time: string;
};

type WebsiteData = {
  name: string;
  domain: string;
  history: HistoryItem[];
};

type HistoryData = WebsiteData[];

const fetchHistoryData = async (): Promise<WebsiteData[]> => {
  return await GetGlobalOverview();
};

const useHistoryData = () =>
  useQuery<HistoryData, Error>({
    queryKey: ["historyDataKey"],
    queryFn: fetchHistoryData,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

const LOGOS = [
  { src: "https://status.eyesp.live/images/amazon.svg" },
  { src: "https://status.eyesp.live/images/github.svg" },
  { src: "https://status.eyesp.live/images/google.svg" },
];

const DataBlock: React.FC<{ value: number }> = ({ value }) => (
  <Box
    width="2.5%"
    height="73px"
    borderRadius="2em"
    bgcolor={value === 200 ? "#7FCD9F" : "#E93F3F"}
    mx={0.3}
    mt={3}
    sx={{ cursor: "pointer" }}
  />
);

const GridItem: React.FC<{ data: WebsiteData; logo: (typeof LOGOS)[0] }> = ({
  data,
  logo,
}) => (
  <Grid
    xs={12}
    // md={6}
    sx={{
      maxWidth: { md: "48%" },
      borderRadius: "0.5rem",
      background: "#2B2E31",
      boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mx: "auto",
      my: ".85em",
      px: "1.5em",
    }}
  >
    <Box>
      <img src={logo.src} alt={data.name} />
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
      alignItems="center"
      width="75%"
      height="100%"
      padding="1rem"
    >
      {data.history.map((historyItem, index) => (
        <DataBlock key={index} value={historyItem.status} />
      ))}
    </Box>
  </Grid>
);

const GlobalOverview: React.FC = () => {
  const { data, error, isLoading, refetch } = useHistoryData();

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={{ xs: -5, sm: -5 }}
      paddingY="3rem"
    >
      {data &&
        Array.isArray(data) &&
        data.map((websiteData: WebsiteData, index: number) => (
          <GridItem
            key={index}
            data={websiteData}
            logo={LOGOS[index % LOGOS.length]}
          />
        ))}
    </Grid>
  );
};

export default GlobalOverview;
