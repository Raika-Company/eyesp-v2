import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

const GlobalOverview: React.FC = () => {
  const data = Array.from({ length: 24 }, () => Math.round(Math.random()));

  return (
    <Container maxWidth="xl">
      <Grid container columnSpacing={2} rowSpacing={2} paddingY="3rem">
        <Grid
          xs={12}
          md={6}
          sx={{
            borderRadius: "0.5rem",
            background: "#2B2E31",
            boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            padding="1rem"
          >
            {data.map((value, index) => (
              <Box
                key={index}
                width="2%"
                height="30px"
                bgcolor={value ? "#7FCD9F" : "#E93F3F"}
                mx={0.1}
              />
            ))}
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            borderRadius: "0.5rem",
            background: "#2B2E31",
            boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            padding="1rem"
          >
            {data.map((value, index) => (
              <Box
                key={index}
                width="2%"
                height="30px"
                bgcolor={value ? "#7FCD9F" : "#E93F3F"}
                mx={0.1}
              />
            ))}
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            borderRadius: "0.5rem",
            background: "#2B2E31",
            boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            padding="1rem"
          >
            {data.map((value, index) => (
              <Box
                key={index}
                width="2%"
                height="30px"
                bgcolor={value ? "#7FCD9F" : "#E93F3F"}
                mx={0.1}
              />
            ))}
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            borderRadius: "0.5rem",
            background: "#2B2E31",
            boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            padding="1rem"
          >
            {data.map((value, index) => (
              <Box
                key={index}
                width="2%"
                height="30px"
                bgcolor={value ? "#7FCD9F" : "#E93F3F"}
                mx={0.1}
              />
            ))}
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            borderRadius: "0.5rem",
            background: "#2B2E31",
            boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            padding="1rem"
          >
            {data.map((value, index) => (
              <Box
                key={index}
                width="2%"
                height="30px"
                bgcolor={value ? "#7FCD9F" : "#E93F3F"}
                mx={0.1}
              />
            ))}
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            borderRadius: "0.5rem",
            background: "#2B2E31",
            boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            padding="1rem"
          >
            {data.map((value, index) => (
              <Box
                key={index}
                width="2%"
                height="30px"
                bgcolor={value ? "#7FCD9F" : "#E93F3F"}
                mx={0.1}
              />
            ))}
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            borderRadius: "0.5rem",
            background: "#2B2E31",
            boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            padding="1rem"
          >
            {data.map((value, index) => (
              <Box
                key={index}
                width="2%"
                height="30px"
                bgcolor={value ? "#7FCD9F" : "#E93F3F"}
                mx={0.1}
              />
            ))}
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            borderRadius: "0.5rem",
            background: "#2B2E31",
            boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            height="100%"
            padding="1rem"
          >
            {data.map((value, index) => (
              <Box
                key={index}
                width="2%"
                height="60px"
                bgcolor={value ? "#7FCD9F" : "#E93F3F"}
                mx={0.1}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GlobalOverview;
