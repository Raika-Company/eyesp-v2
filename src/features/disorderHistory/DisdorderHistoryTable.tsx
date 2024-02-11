import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  keyframes,
  styled,
  useMediaQuery,
  Table as MuiTable,
  useTheme,
} from "@mui/material";
import React from "react";

type DataRow = {
  date: string;
  hour: string;
  categoryDis: string;
  causeDis: string;
  handle: string;
};

interface Props {
  cellHeaders: string[];
  rows: DataRow[];
  delay?: number;
}
const DisdorderHistoryTable: React.FC<Props> = ({
  cellHeaders,
  rows,
  delay,
}) => {
  const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
  const theme = useTheme();

  const RowBox = styled(TableRow)(() => ({
    display: "flex",
    alignItems: "center",
    borderRadius: "1rem",
    paddingRight: "3rem",
    position: "relative",
    "::after": {
      content: "''",
      position: "absolute",
      width: "30%",
      height: "2px",
      left: "10%",
      right: "35%",
      top: "100%",
      alignItems: "center",
      background:
        "linear-gradient(90deg,rgba(255, 255, 255, 0) 0%,rgb(255, 255, 255) 49.48%,rgba(255, 255, 255, 0) 100%)",
      opacity: "0.2",
    },
    "& > *": {
      flex: 1,
    },
    "& > *:nth-of-type(1)": {
      flex: 0.8,
    },
    "& > *:nth-of-type(4)": {
      flex: 0.5,
    },
  }));
  const RowBoxHead = styled(TableRow)(() => ({
    display: "flex",
    alignItems: "center",
    borderRadius: "1rem",
    paddingRight: "3rem",
    position: "relative",

    "::after": {
      content: "''",
      position: "absolute",
      width: "100%",
      right: "0",
      height: "2px",

      backgroundColor: "white",
      top: "100%",
      alignItems: "center",
    },
    "& > *": {
      flex: 1,
    },
    "& > *:nth-of-type(1)": {
      flex: 0.8,
    },
    "& > *:nth-of-type(4)": {
      flex: 0.5,
    },
  }));
  const animatedRows =
    rows.length >= 2
      ? rows
      : [...rows, ...Array(2 - rows.length).fill(rows[0])];

  const getColorBasedOnHandle = (handle: string) => {
    const color = handle === "برطرف شده" ? "green" : "red";
    return color;
  };

  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <MuiTable
      aria-label="simple table"
      className="transition duration-500 ease-in-out"
    >
      <TableHead
        sx={{
          ".css-2s229y-MuiTableCell-root,.css-lt8975-MuiTableCell-root, .css-167oed0-MuiTableCell-root,.css-o4v5rt-MuiTableCell-root,.css-gsxlzn-MuiTableCell-root,.css-10kadzj-MuiTableCell-root":
            { border: "none" },
        }}
      >
        <RowBoxHead>
          {cellHeaders.map((header, idx) => (
            <TableCell
              sx={{ borderBottom: "none" }}
              align={"right"}
              component="th"
              scope="row"
              key={idx}
            >
              <Typography variant="h3"> {header}</Typography>
            </TableCell>
          ))}
        </RowBoxHead>
      </TableHead>

      <TableBody>
        {animatedRows.map((row, idx) => {
          const animationDelay = delay ? `${idx * delay}s` : "0s";
          const handleColor = getColorBasedOnHandle(row.handle);
          // const dateObj = new Date(row.date);
          // let persianDate = dateObj.toLocaleDateString("fa-IR");

          return (
            <React.Fragment key={idx}>
              <RowBox
                sx={{
                  "td, th": { border: 0 },
                  height: "70px",
                  animation: `${fadeIn} 1s ease-in-out ${animationDelay} forwards`,
                }}
              >
                <TableCell
                  align="right"
                  sx={{
                    color: "white",
                  }}
                >
                  <Typography
                    variant="h3"
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
                    />{" "}
                    <span>{row.hour}</span>
                  </Typography>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "white",
                  }}
                >
                  <Typography variant="h3"> {row.categoryDis}</Typography>
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "white",
                    fontFamily: "PeydaLight",
                    fontSize: isLgScreen ? "0.7rem" : "1rem",
                  }}
                >
                  <Typography variant="h3"> {row.causeDis}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h2" sx={{ color: handleColor }}>
                    {row.handle}
                  </Typography>
                </TableCell>
              </RowBox>
            </React.Fragment>
          );
        })}
      </TableBody>
    </MuiTable>
  );
};

export default DisdorderHistoryTable;
