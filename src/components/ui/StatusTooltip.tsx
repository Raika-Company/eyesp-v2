import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  ipx: string;
  ipxColor?: string;
  igw: string;
  igwColor?: string;
  x: number | string;
  y: number | string;
}

const StatusTooltip: FC<Props> = ({
  ipx,
  ipxColor = "#fff",
  igw,
  igwColor = "#fff",
  x,
  y,
}) => {
  return (
    <Box
      sx={{
        transition: "all .2s ease",
        width: "150px",
        height: "150px",
        borderRadius: "2rem",
        position: "fixed",
        zIndex: "100",
        top: y,
        left: x,
        background: "#000000aa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingX: "1rem",
        gap: "1rem",
      }}
    >
      <Stack
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        <Typography fontSize=".8rem">سرویس‌های داخلی:</Typography>
        <Typography color={ipxColor}>{ipx}</Typography>
      </Stack>
      <Stack
        sx={{
          whiteSpace: "nowrap",
        }}
      >
        <Typography fontSize=".8rem">سرویس‌های خارجی:</Typography>
        <Typography color={igwColor}>{igw}</Typography>
      </Stack>
    </Box>
  );
};

export default StatusTooltip;
