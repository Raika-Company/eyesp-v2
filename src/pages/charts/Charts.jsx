import {
  Box,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";

import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
// import xAxisLight from "../../app/assets/image/time-compare-light.svg";
// import xAxisDark from "../../app/assets/image/time-compare-dark.svg";
// import YAxisLine from "./YAxisLine";
import axios from "axios";
// import { ContainedSelect } from "../../app/common/ContainedSelect";
import CardContainer from "../disordersHistory/components/CardContainer";

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          color: "#333",
          padding: "1px",
          textAlign: "left",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            margin: "13px 19px",
          }}
        >
          <p>month: {payload[0].payload.month.split(" ")[0]}</p>
          <p>value: {payload[0].payload.value}</p>
        </div>
      </div>
    );
  }

  return null;
};
const titlesChart = [
  {
    title: "میانگینscsdcdcd عملکرد",
    unit: "Mb/s",
  },
  {
    title: "پاکت لاس",
    unit: "%",
  },
];
function GridItem({ theme, rendered, title, data, unit }) {
  return (
    <Grid item xs={12} md={5} sx={{ display: "flex", gap: "2rem" }}>
      <Typography color="text.main" gutterBottom>
        {title}
      </Typography>
      <Box
        borderRadius="3rem"
        //   sx={{
        //     background:
        //       theme.palette.mode === "dark"
        //         ? "radial-gradient(646.45% 156.82% at 1.67% -6.71%, rgba(103, 154, 202, 0.23) 0.31%, rgba(104, 137, 151, 0.00) 100%)"
        //         : "radial-gradient(646.45% 156.82% at 1.67% -6.71%, #E2F7FF 0.31%, rgba(188, 203, 209, 0.00) 100%)",
        //   }}
        width="100%"
        height="12.875rem"
      >
        <Box>
          <ResponsiveContainer width="98%" height={150}>
            <AreaChart width="70%" height="100%" data={data}>
              <Tooltip content={<CustomTooltip />} />
              <defs>
                <linearGradient id="gradientChart" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0.333333"
                    stopColor="#0091E3"
                    stopOpacity="0.167089"
                  />
                  <stop offset="1" stopColor="#008EDD" stopOpacity="0" />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#008EDD"
                fill="url(#gradientChart)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
        {/* <img
            src={theme.palette.mode === "light" ? xAxisLight : xAxisDark}
            alt="xAxis"
            style={{ width: "100%" }}
          /> */}
        {/* <YAxisLine
          max={Math.max(...data.map((line) => line.value))}
          unit={unit}
        /> */}
      </Box>
    </Grid>
  );
}

function generateRandomData() {
  const data = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      month: `${i} ماه`,
      value: Math.floor(Math.random() * 100),
    });
  }
  return data;
}
const Charts = () => {
  const theme = useTheme();
  const [ispData, setIspData] = useState([]);
  const [rendered, setRendered] = useState(false);
  const [formControlItems, setFormControlItems] = useState("");
  const [currentChartData, setCurrentChartData] = useState({});
  const [randomChartData1, setRandomChartData1] = useState([]);
  const [randomChartData2, setRandomChartData2] = useState([]);
  const [randomChartData3, setRandomChartData3] = useState([]);
  const [randomChartData4, setRandomChartData4] = useState([]);
  const [randomChartData5, setRandomChartData5] = useState([]);
  const [randomChartData6, setRandomChartData6] = useState([]);
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const handleChange = (event) => {
    setFormControlItems(event.target.value);
    const selectedISPData = ispData.find(
      (item) => item.id === event.target.value
    );
    if (selectedISPData) {
      setCurrentChartData(selectedISPData);
      setRandomChartData1(generateRandomData());
      setRandomChartData2(generateRandomData());
      setRandomChartData3(generateRandomData());
      setRandomChartData4(generateRandomData());
    }
  };

  useEffect(() => {
    axios
      .get("/data/chartData.json")
      .then((response) => {
        const data = response.data;
        setIspData(data);
        const defaultISPData = data.find((item) => item.id === "ایرانسل"); // find "ایرانسل" data
        if (defaultISPData) {
          setCurrentChartData(defaultISPData); // set "ایرانسل" data as default chart data
          setRandomChartData1(generateRandomData());
          setRandomChartData2(generateRandomData());
          setRandomChartData3(generateRandomData());
          setRandomChartData4(generateRandomData());
          setRandomChartData5(generateRandomData());
          setRandomChartData6(generateRandomData());
        }
      })
      .catch((error) => {
        console.log("خطا در بارگذاری اطلاعات", error);
      });
  }, []);
  useEffect(() => {
    setRendered(true);
  }, []);
  return (
    <>
      <Box
        sx={{
          display: isMdScreen ? "flex" : " none",
          width: "100%",
          height: "78px",
          borderRadius: "2rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
      <Container maxWidth="xl">
        <CardContainer sx={{ backgroundColor: "transparent" }}>
          <Grid container>
            {titlesChart.map((line, index) => (
              <GridItem
                key={index}
                theme={theme}
                rendered={rendered}
                title={line.title}
                unit={line.unit}
                data={
                  // Assign each chart a different randomChartData
                  index === 0
                    ? randomChartData1
                    : index === 1
                    ? randomChartData2
                    : index === 2
                    ? randomChartData3
                    : index === 3
                    ? randomChartData4
                    : randomChartData5
                }
              />
            ))}
          </Grid>
        </CardContainer>
      </Container>
    </>
  );
};

export default Charts;
