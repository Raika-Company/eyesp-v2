import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  styled,
  Divider,
} from "@mui/material";
import React from "react";
import CardContainer from "./components/CardContainer";
import history from "../../assets/images/history.svg";

const RowBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "1rem",
  paddingInline: "1.69rem",
  "& > *": {
    flex: 1,
    fontFamily: "PeydaLight",
  },
  "& > *:nth-of-type(1)": {
    flex: 0.5,
  },
  "& > *:nth-of-type(4)": {
    flex: 0.5,
  },
}));
const HorizontalLine = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  width: "400px",
  height: "2px",
  background:
    "linear-gradient(90deg,rgba(255, 255, 255, 0) 0%,rgb(255, 255, 255) 49.48%,rgba(255, 255, 255, 0) 100%)",
  opacity: "0.2",
}));
const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "وضعیت"];

const DisordersHistory = () => {
  return (
    <Container maxWidth="xl">
      <CardContainer>
        <Box sx={{ backgroundColor: "black" }}>
          {" "}
          <Box
            padding="1.69rem"
            display="flex"
            justifyContent="start"
            gap={1}
            alignItems="center"
          >
            <img src={history} alt="history" />
            <Typography fontWeight={800} fontSize="2rem">
              تاریخچه اختلالات
            </Typography>
          </Box>
        </Box>
        <Table aria-label="simple table">
          <TableHead
            sx={{
              ".css-2s229y-MuiTableCell-root,.css-lt8975-MuiTableCell-root, .css-167oed0-MuiTableCell-root,.css-o4v5rt-MuiTableCell-root,.css-gsxlzn-MuiTableCell-root,.css-10kadzj-MuiTableCell-root":
                { border: "none" },
            }}
          >
            <RowBox>
              {cellHeaders.map((header, idx) => (
                <TableCell
                  sx={{ borderBottom: "none" }}
                  align={"right"}
                  component="th"
                  scope="row"
                  key={idx}
                >
                  {header}
                </TableCell>
              ))}
            </RowBox>
            <div style={{ width: "100%", padding: "10px 0" }}>
              <Divider />
            </div>
          </TableHead>
          <TableBody>
            <RowBox
              sx={{
                "td, th": { border: 0 },
                height: "70px",
              }}
            >
              <TableCell align="right" sx={{ color: "white" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <span>1402/3/24</span>
                  <Box
                    sx={{
                      width: "2px",
                      height: "20px",
                      background: "white",
                    }}
                  />{" "}
                  <span>12:23:45</span>
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم{" "}
              </TableCell>
              <TableCell sx={{ color: "red" }} align="right">
                برطرف نشده
              </TableCell>
            </RowBox>
            <HorizontalLine />
            <RowBox
              sx={{
                "td, th": { border: 0 },
                height: "70px",
              }}
            >
              <TableCell align="right" sx={{ color: "white" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <span>1402/3/24</span>
                  <Box
                    sx={{
                      width: "2px",
                      height: "20px",
                      background: "white",
                    }}
                  />{" "}
                  <span>12:23:45</span>
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
              </TableCell>
              <TableCell align="right" sx={{ color: "white" }}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم{" "}
              </TableCell>
              <TableCell sx={{ color: "green" }} align="right">
                برطرف شده
              </TableCell>
            </RowBox>
          </TableBody>
        </Table>
      </CardContainer>
    </Container>
  );
};

export default DisordersHistory;
