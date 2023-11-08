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
} from "@mui/material";

interface Props {
  cellHeaders: string[];
  isAI?: boolean;
}

const CustomTable: React.FC<Props> = ({ cellHeaders, isAI }) => {
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
    width: "400px",
    height: "2px",
    background:
      "linear-gradient(90deg,rgba(255, 255, 255, 0) 0%,rgb(255, 255, 255) 49.48%,rgba(255, 255, 255, 0) 100%)",
    opacity: "0.2",
  }));
  return (
    <>
      <MuiTable aria-label="simple table">
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
          <Stack style={{ width: "100%", padding: "10px 0" }}>
            <Divider />
          </Stack>
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
                <Typography> برطرف نشده</Typography>
              )}
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
                <Typography> برطرف شده</Typography>
              )}
            </TableCell>
          </RowBox>
        </TableBody>
      </MuiTable>
    </>
  );
};

export default CustomTable;
