import {
  Box,
  Button,
  Divider,
  Table as MuiTable,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  styled,
  keyframes,
  TableRow,
} from "@mui/material";

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

const HorizontalLine = styled(TableCell)(() => ({
  background:
    "linear-gradient(90deg,rgba(255, 255, 255, 0) 0%,rgb(255, 255, 255) 49.48%,rgba(255, 255, 255, 0) 100%)",
  height: "2px",
  opacity: "0.2",
  borderBottom: "none",
  padding: 0,
  // Add more styles as needed
}));
const CustomTable: React.FC<Props> = ({ cellHeaders, isAI, rows, delay }) => {
  const animatedRows =
    rows.length >= 2
      ? rows
      : [...rows, ...Array(2 - rows.length).fill(rows[0])];
  const getColorBasedOnHandle = (handle: string) => {
    const color = handle === "برطرف شده" ? "green" : "red";
    return color;
  };
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
          <RowBox>
            {cellHeaders.map((header, idx) => (
              <TableCell
                sx={{ borderBottom: "none" }}
                align={"right"}
                component="th" // Ensure this is a th
                scope="row"
                key={idx}
              >
                {header}
              </TableCell>
            ))}
          </RowBox>
        </TableHead>
        <Stack sx={{ width: "100%", padding: "10px 0" }}>
          <Divider />
        </Stack>
        <TableBody>
          {animatedRows?.map((row, idx) => {
            const animationDelay = delay ? `${idx * delay}s` : "0s";
            const handleColor = getColorBasedOnHandle(row.handle);

            return (
              <TableRow key={idx}>
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
                <HorizontalLine colSpan={cellHeaders.length} />
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
    </>
  );
};

export default CustomTable;
