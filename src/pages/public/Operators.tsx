import React, { useEffect, useState } from "react";
import operators from "../../assets/images/operators-icon.svg";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import irancell from "../../assets/images/irancell.svg";
import hamraheAval from "../../assets/images/hamraheAval-logo.svg";
import Chart from "../../features/charts/Chart";
import HistoryOperators from "./HistoryOperators";

import { SelectChangeEvent } from "@mui/material/Select";
import Header from "../../components/ui/Header";
import api from "../../services";
import { ChartReturnType } from "../../services/Chart";
import { MetricsReturnType } from "../../services/dashboard/metrics";

/**
 * Interface for InfoItem properties.
 */
interface InfoItemProps {
  title: string;
  value: string | number;
  isLoading?: boolean;
}

/**
 * Common styles used in the Operators component.
 */
// const commonStyles = {
//   title: {
//     textAlign: "center" as const, // Fix for TypeScript
//   },
//   infoValue: {
//     color: "#7A7775",
//     fontSize: "0.9375rem",
//   },
//   mainInfo: {
//     color: "#fff",
//     fontSize: "1.8rem",
//     fontWeight: "700",
//   },
// } as const; // Ensure immutability and better type inference

/**
 * InfoItem component: Displays a piece of information with title and value.
 * @param props - The properties passed to the InfoItem component.
 * @param props.title - The title of the information item.
 * @param props.value - The value of the information item.
 */
const InfoItem: React.FC<InfoItemProps> = ({ title, value, isLoading }) => {
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
      {isLoading ? (
        <CircularProgress size={24} />
      ) : (
        <Typography component="span" sx={{ fontSize: "1.3rem", color: "#fff" }}>
          {value}
        </Typography>
      )}
    </Box>
  );
};

/**
 * Operators component: Displays operator information and charts.
 * It utilizes Material UI components and custom components like Chart and HistoryOperators.
 */
interface Operator {
  name: string;
  logo: string;
}
type ChartData = ChartReturnType | null;
const Operators: React.FC = () => {
  const mockChartData: ChartReturnType = {
    id: "string",
    data: {
      download: [
        { name: "January", value: 400 },
        { name: "February", value: 300 },
        { name: "March", value: 200 },
        { name: "April", value: 278 },
        { name: "May", value: 189 },
      ],
      upload: [
        { name: "March", value: 200 },
        { name: "April", value: 278 },
        { name: "May", value: 189 },
        { name: "January", value: 400 },
        { name: "February", value: 300 },
      ],
      ping: [
        { name: "January", value: 400 },
        { name: "February", value: 300 },
        { name: "March", value: 200 },
        { name: "April", value: 278 },
        { name: "May", value: 189 },
      ],
      packet_loss: [
        { name: "January", value: 400 },
        { name: "February", value: 300 },
        { name: "March", value: 200 },
        { name: "April", value: 278 },
        { name: "May", value: 189 },
      ],
      jitter: [
        { name: "January", value: 400 },
        { name: "February", value: 300 },
        { name: "March", value: 200 },
        { name: "April", value: 278 },
        { name: "May", value: 189 },
      ],
    },
  };
  const theme = useTheme();
  const [province, setProvince] = useState("");
  const [selectedISP, setSelectedISP] = useState("");
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(
    null
  );
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>("دانلود");
  const [isloading, setIsLoading] = useState<boolean>(false);

  const [category, setCategory] = useState("");
  const [averageDetail, setAverageDetail] = useState<MetricsReturnType | null>(
    null
  );
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setIsLoading(true); // Start loading
    api.metrics
      .getAllMetrics()
      .then((res) => {
        setAverageDetail(res.data);
        setIsLoading(false); // Stop loading once data is fetched
      })
      .catch(() => {
        setIsLoading(false); // Ensure loading is stopped on error
      });
  }, []);

  /**
   * Handles changes to the category selection.
   * @param event - The event object containing the selected value.
   */
  const handleCategory = (event: SelectChangeEvent<unknown>) => {
    const newCategory = event.target.value as string;
    setCategory(newCategory);

    switch (newCategory) {
      case "سالانه":
        api.Chart.getYearsChart()
          .then((response) => {
            if (response.data) {
              // Type guard
              console.log(response.data);
              setChartData(response.data);
            } else {
              console.error("Data is undefined");
              setChartData(mockChartData);
            }
          })
          .catch((error) => {
            console.error(
              "Failed to fetch chart data, using mock data instead.",
              error
            );
            setChartData(mockChartData);
          });
        break;
      case "ماهانه":
        api.Chart.getMonthsChart()
          .then((response) => {
            if (response.data) {
              // Type guard
              console.log(response.data);
              setChartData(response.data);
            } else {
              setChartData(mockChartData);
              console.error("Data is undefined");
            }
          })
          .catch((err) => console.error(err));
        break;
      case "هفتگی":
        api.Chart.getweeksChart()
          .then((response) => {
            if (response.data) {
              // Type guard
              console.log(response.data);
              setChartData(response.data);
            } else {
              setChartData(mockChartData);
              console.error("Data is undefined");
            }
          })
          .catch((err) => console.error(err));
        break;
      case "روزانه":
        api.Chart.getDaysChart()
          .then((response) => {
            if (response.data) {
              // Type guard
              console.log(response.data);
              setChartData(response.data);
            } else {
              setChartData(mockChartData);
              console.error("Data is undefined");
            }
          })
          .catch((err) => console.error(err));
        break;
      default:
        api.Chart.getYearsChart()
          .then((response) => setChartData(response.data))
          .catch((error) => {
            console.error(
              "Failed to fetch chart data, using mock data instead.",
              error
            );
            setChartData(mockChartData);
          });
        break;
    }
  };

  const handleProvinceChange = (event: SelectChangeEvent<unknown>) => {
    setProvince(event.target.value as string);
  };
  const handleISPChange = (event: SelectChangeEvent<unknown>) => {
    const selectedISP = event.target.value as string;
    setSelectedISP(selectedISP);
    const operator = logos.find((operator) => operator.name === selectedISP);
    if (operator) {
      setSelectedOperator(operator);
    }
  };

  const logos: Operator[] = [
    {
      name: "ایرانسل",
      logo: irancell,
    },
    {
      name: "همراه اول",
      logo: hamraheAval,
    },
  ];
  useEffect(() => {
    api.Chart.getYearsChart()
      .then((response) => setChartData(response.data))
      .catch((error) => {
        console.error(
          "Failed to fetch chart data, using mock data instead.",
          error
        );
        setChartData(mockChartData);
      });
  }, []);

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
        showButton={true}
      />
      <Box
        sx={{
          bgcolor: "#2B2E31",
          overflow: "hidden",
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
            {selectedOperator && (
              <>
                <img
                  src={selectedOperator.logo}
                  alt="operator-logo"
                  style={{ width: "226px", height: "123px" }}
                />
                <Box>
                  <Typography sx={{ color: "#7A7775", fontSize: "1.3rem" }}>
                    اپراتور
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: "1.8rem",
                      fontWeight: "700",
                    }}
                  >
                    {selectedOperator.name}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          <Box sx={{ width: isSmScreen ? "98%" : isMdScreen ? "98%" : "46%" }}>
            <Chart
              chartData={chartData}
              province={province}
              selectedISP={selectedISP}
              category={selectedMetric}
              title=""
              desc="نمودار وضعیت"
              selectedMetric={selectedMetric}
              setSelectedMetric={setSelectedMetric}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width={isMdScreen ? "90%" : "20%"}
          >
            <InfoItem
              title="سرعت دانلود"
              value={averageDetail?.downloadAverage || "3"}
              isLoading={isloading}
            />
            {/* <InfoItem title="سرعت دانلود" value="18Mbps" /> */}
            <InfoItem
              title="سرعت آپلود"
              value={averageDetail?.packetLossAverage || "5"}
              isLoading={isloading}
            />
            <InfoItem
              title="پینگ"
              value={averageDetail?.pingAverage || "6"}
              isLoading={isloading}
            />
            <InfoItem
              title="جیتر"
              value={averageDetail?.jitterAverage || "9"}
              isLoading={isloading}
            />
            <InfoItem title="رتبه کشوری" value="2" />
            <InfoItem
              title="رتبه جهانی"
              value={averageDetail?.speedAverage || "5"}
              isLoading={isloading}
            />
          </Box>
          <HistoryOperators />
        </Box>
      </Box>
    </>
  );
};

export default Operators;
