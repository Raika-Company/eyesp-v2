import React from "react";

import operators from "../../assets/images/operators-icon.svg";
import HeaderOperators from "./HeaderOperators";
import { Box, Typography } from "@mui/material";
import irancell from "../../assets/images/irancell.svg";
import Chart from "../../features/charts/Chart";
import HistoryOperators from "./HistoryOperators";

interface InfoItemProps {
  title: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ title, value }) => (
  <Typography sx={{ fontSize: "1.3rem", color: "#7A7775", display: "flex" }}>
    {title}:{" "}
    <Typography component="span" sx={{ fontSize: "1.3rem", color: "#fff" }}>
      {value}
    </Typography>
  </Typography>
);

const commonStyles = {
  title: {
    textAlign: "center" as const, // Fix for TypeScript
  },
  infoValue: {
    color: "#7A7775",
    fontSize: "0.9375rem",
  },
  mainInfo: {
    color: "#fff",
    fontSize: "1.8rem",
    fontWeight: "700",
  },
} as const; // Ensure immutability and better type inference

const Operators: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#2B2E31", overflow: "hidden", height: "100dvh" }}>
      <HeaderOperators
        title="اپراتور ها"
        iconPath={operators}
        selectTitle="فیلتر:"
      />
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        alignItems="center"
        mt="2em"
      >
        <Box sx={commonStyles.title}>
          <img src={irancell} alt="operator-logo" />
          <Typography sx={commonStyles.infoValue}>اپراتور</Typography>
          <Typography sx={commonStyles.mainInfo}>ایرانسل</Typography>
        </Box>
        <Box width={800}>
          <Chart title="" desc="نمودار وضعیت" />
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          <InfoItem title="سرعت دانلود" value="18Mbps" />
          <InfoItem title="سرعت آپلود" value="18Mbps" />
          <InfoItem title="پینگ" value="40ms" />
          <InfoItem title="جیتر" value="7ms" />
          <InfoItem title="رتبه کشوری" value="2" />
          <InfoItem title="رتبه جهانی" value="90" />
        </Box>
      </Box>
      <HistoryOperators />
    </Box>
  );
};

export default Operators;
