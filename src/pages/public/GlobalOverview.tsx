import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Button,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import WestIcon from "@mui/icons-material/West";
import serverStatusData from "../../../public/data/server_status.json";
import ModalNotData from "../../components/ui/ModalNotData";
import axios from "axios";
import GridItem from "../../components/ui/GridItem";
import TransformData from "../../components/ui/TransformData";
import { WebsiteData } from "../../utils/types";

const GlobalOverview: React.FC = () => {
  const [serverData, setServerData] = useState<WebsiteData[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  useEffect(() => {
    const fetchData = async (endpoint: string) => {
      setLoading(true);
      try {
        const response = await axios.get(endpoint);
        setServerData(TransformData(response.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (type === "internal") {
      fetchData("http://95.38.58.41:8000/api/v1/internal/analysis/result");
    } else if (type === "external") {
      fetchData("http://95.38.58.41:8000/api/v1/external/analysis/result");
    }
  }, [type]);

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
        {serverData ? (
          <Grid container rowSpacing={4} paddingY="1rem">
            {serverData.map((dataItem, index) => (
              <GridItem key={index} data={dataItem} />
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
