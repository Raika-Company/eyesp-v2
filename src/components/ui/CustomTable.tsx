import {
  Box,
  Button,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  styled,
  keyframes,
  TableRow,
  useMediaQuery,
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
  isAI?: boolean;
  rows: DataRow[];
  delay?: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
    fontFamily: "PeydaLight",
  },
  "& > *:nth-of-type(1)": {
    flex: 0.5,
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
    fontFamily: "PeydaLight",
  },
  "& > *:nth-of-type(1)": {
    flex: 0.5,
  },
  "& > *:nth-of-type(4)": {
    flex: 0.5,
  },
}));

const CustomTable: React.FC<Props> = ({ cellHeaders, isAI, rows, delay }) => {
  const theme = useTheme();

  const animatedRows =
    rows.length >= 2
      ? rows
      : [...rows, ...Array(2 - rows.length).fill(rows[0])];

  const getColorBasedOnHandle = (handle: string) => {
    const color = handle === "برطرف شده" ? "green" : "red";
    return color;
  };
  // const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  // const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
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
                {header}
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
                      />{" "}
                      <span>{row.hour}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {row.categoryDis}
                  </TableCell>
                  <TableCell align="right" sx={{ color: "white" }}>
                    {row.causeDis}
                  </TableCell>
                  <TableCell align="right">
                    {isAI ? (
                      <Button
                        sx={{
                          backgroundColor: "#7A7775",
                          borderRadius: "0.597rem",
                          color: "white",
                          paddinX: "1rem",
                          paddingY: "0.6rem",
                          fontFamily: "PeydaLight",
                          fontSize: isLgScreen ? "0.7rem" : "1rem",
                        }}
                      >
                        کمک از هوش مصنوعی
                      </Button>
                    ) : (
                      <Typography sx={{ color: handleColor }}>
                        {row.handle}
                      </Typography>
                    )}
                  </TableCell>
                </RowBox>
              </React.Fragment>
            );
          })}
        </TableBody>
      </MuiTable>
    </>
  );
};

export default CustomTable;
