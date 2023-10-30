import { Box, Container, Typography } from "@mui/material";
import React from "react";
import RefreshIcon from "../components/icons/RefreshIcon";

const Disorders: React.FC = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: "min(3rem, 3%)",
        boxShadow: "0px 12px 17px 0px rgba(0, 0, 0, 0.60)",
        overflow: "visible"
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center" 
        gap="1rem"
        borderRadius="0.5rem 0.5rem 0rem 0rem"
        sx={{ background: "#232629" }}
        paddingX="1.6rem"
        paddingY="1.3rem"
      >
        <RefreshIcon />
        <Typography
          component="h2"
          color="#C7C6C3"
          fontSize="1.34rem"
          fontWeight={800}
        >
          تاریخچه اختلالات
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        px="3.5rem"
        py="2rem"
        sx={{ background: "#2B2E31" }}
      >
        {/* Header */}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          mb="1.5rem"
        >
          <Typography color="#C7C6C3">وضعیت</Typography>
          <Typography color="#C7C6C3">دلیل خطا</Typography>
          <Typography color="#C7C6C3">نوع خطا</Typography>
          <Typography color="#C7C6C3">تاریخ و ساعت</Typography>
        </Box>

        {/* Rows */}
        <Box display="flex" flexDirection="column" gap="1.5rem">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography color="#C7C6C3">بروزرسانی نشده</Typography>
            <Typography color="#C7C6C3">روزی به شب شدن</Typography>
            <Typography color="#C7C6C3">روزی به شب شدن</Typography>
            <Typography color="#C7C6C3">12/04/1402 | 22:35</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography color="#C7C6C3">بروزرسانی نشده</Typography>
            <Typography color="#C7C6C3">روزی به شب شدن</Typography>
            <Typography color="#C7C6C3">روزی به شب شدن</Typography>
            <Typography color="#C7C6C3">12/04/1402 | 20:31</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Disorders;
