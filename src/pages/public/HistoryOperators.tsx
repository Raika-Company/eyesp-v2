import React from "react";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  styled,
} from "@mui/material";

const RowBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "1rem",
  paddingRight: "3rem",
  "& > *": {
    flex: 1,
    fontFamily: "PeydaLight",
  },
  "& > *:nth-of-type(1)": {
    flex: 0.5,
  },
  "& > *:nth-of-type(4)": {
    flex: 0.3,
  },
}));

const HorizontalLine = styled(Box)(({ theme }) => ({
  margin: "0 auto",
  height: "2px",
  background:
    "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 49.48%, rgba(255, 255, 255, 0) 100%)",
  opacity: "0.2",
}));

const cellHeaders = ["تاریخ و ساعت", "نوع اختلال", "دلیل اختلال", "وضعیت"];

const rowData = [
  {
    date: "1402/3/24",
    time: "12:23:45",
    type: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
    reason: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم",
    status: "برطرف نشده",
  },
  {
    date: "1402/3/24",
    time: "12:23:45",
    type: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
    reason: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم",
    status: "برطرف شده",
  },
];

const HistoryOperators = () => {
  return (
    <Box
      sx={{
        width: "86%",
        margin: "0 auto",
        borderRadius: "0.8em",
        marginTop: "2em",
      }}
    >
      <Stack direction="row">
        <Button
          sx={{
            ml: "1em",
            borderRadius: "0px",
            borderTopRightRadius: "0.75em",
            borderTopLeftRadius: "0.75em",
            bgcolor: "#232629",
            boxShadow: "0",
            color: "#fff",
            fontSize: "1.3125rem",
          }}
          variant="contained"
        >
          اختلال های اخیر
        </Button>
        <Button
          sx={{
            borderRadius: "0px",
            borderTopRightRadius: "0.75em",
            borderTopLeftRadius: "0.75em",
            bgcolor: "#232629",
            boxShadow: "0",
            color: "#7A7775",
            fontSize: "1.3125rem",
            "&:hover": {
              color: "#fff",
            },
          }}
          variant="contained"
          href="#contained-buttons"
        >
          اختلال های فعلی
        </Button>
      </Stack>
      <Box
        sx={{
          height: "14.97em",
          borderRadius: "0.8em",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
          borderTopRightRadius: "0",
          backgroundColor: "#232629",
        }}
      >
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
            <HorizontalLine />
          </TableHead>
          <TableBody>
            {rowData.map((row, index) => (
              <RowBox
                sx={{
                  "td, th": { border: 0 },
                  height: "70px",
                }}
                key={index}
              >
                <TableCell align="right" sx={{ color: "white" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span>{row.date}</span>
                    <Box
                      sx={{
                        width: "2px",
                        height: "20px",
                        background: "white",
                      }}
                    />
                    <span>{row.time}</span>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  {row.type}
                </TableCell>
                <TableCell align="right" sx={{ color: "white" }}>
                  {row.reason}
                </TableCell>
                <TableCell
                  sx={{ color: row.status === "برطرف شده" ? "green" : "red" }}
                  align="right"
                >
                  {row.status}
                </TableCell>
              </RowBox>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default HistoryOperators;
