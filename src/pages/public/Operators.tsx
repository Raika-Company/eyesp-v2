import React, { useState } from "react";
import operators from "../../assets/images/operators-icon.svg";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import irancell from "../../assets/images/irancell.svg";
import Chart from "../../features/charts/Chart";
import HistoryOperators from "./HistoryOperators";

import { SelectChangeEvent } from "@mui/material/Select";
import Header from "../../components/ui/Header";

/**
 * Interface for InfoItem properties.
 */
interface InfoItemProps {
  title: string;
  value: string;
}

/**
 * Common styles used in the Operators component.
 */
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

/**
 * InfoItem component: Displays a piece of information with title and value.
 * @param props - The properties passed to the InfoItem component.
 * @param props.title - The title of the information item.
 * @param props.value - The value of the information item.
 */
const InfoItem: React.FC<InfoItemProps> = ({ title, value }) => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isMdScreen ? "space-between" : "flex-start",
      }}
    >
      <Typography
        sx={{ fontSize: "1.3rem", color: "#7A7775", display: "flex" }}
      >
        {title}:{" "}
      </Typography>
      <Typography component="span" sx={{ fontSize: "1.3rem", color: "#fff" }}>
        {value}
      </Typography>
    </Box>
  );
};

/**
 * Operators component: Displays operator information and charts.
 * It utilizes Material UI components and custom components like Chart and HistoryOperators.
 */
const Operators: React.FC = () => {
  const theme = useTheme();
  const [province, setProvince] = useState("");
  const [selectedISP, setSelectedISP] = useState("");
  const [category, setCategory] = useState("");
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  /**
   * Handles changes to the category selection.
   * @param event - The event object containing the selected value.
   */
  const handleCategory = (event: SelectChangeEvent<unknown>) => {
    setCategory(event.target.value as string);
  };
  const handleProvinceChange = (event: SelectChangeEvent<unknown>) => {
    setProvince(event.target.value as string);
  };
  const handleISPChange = (event: SelectChangeEvent<unknown>) => {
    setSelectedISP(event.target.value as string);
  };

  return (
    <>
      <Header
        handleISPChange={handleISPChange}
        handleProvinceChange={handleProvinceChange}
        handleCategory={handleCategory}
        category={category}
        province={province}
        selectedISP={selectedISP}
        title="اپراتور ها"
        iconPath={operators}
        selectTitle="فیلتر:"
        // isButtonSelect={true}
      />
      <Box
        sx={{
          bgcolor: "#2B2E31",
          overflowX: "hidden",
          height: "100dvh",
        }}
      >
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          gap={isMdScreen ? 2 : 4}
          mt="2em"
          px="1em"
        >
          <Box
            sx={{
              width: isSmScreen ? "100%" : isMdScreen ? "90%" : "10%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: isMdScreen ? "space-between" : "center",
              textAlign: "center",
            }}
          >
            <img src={irancell} alt="operator-logo" />
            <Box>
              <Typography sx={commonStyles.infoValue}>اپراتور</Typography>
              <Typography sx={commonStyles.mainInfo}>ایرانسل</Typography>
            </Box>
          </Box>
          <Box sx={{ width: isSmScreen ? "98%" : isMdScreen ? "98%" : "46%" }}>
            <Chart
              province={province}
              selectedISP={selectedISP}
              category={category}
              title=""
              desc="نمودار وضعیت"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width={isMdScreen ? "90%" : "20%"}
          >
            <InfoItem title="سرعت دانلود" value="18Mbps" />
            <InfoItem title="سرعت دانلود" value="18Mbps" />
            <InfoItem title="سرعت آپلود" value="18Mbps" />
            <InfoItem title="پینگ" value="40ms" />
            <InfoItem title="جیتر" value="7ms" />
            <InfoItem title="رتبه کشوری" value="2" />
            <InfoItem title="رتبه جهانی" value="90" />
          </Box>
          <HistoryOperators />
        </Box>
      </Box>
    </>
  );
};

export default Operators;
