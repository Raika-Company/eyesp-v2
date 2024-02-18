import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

/**
 * Props for the StatusTooltip component.
 */
interface Props {
  ipx: string;
  ipxColor?: string;
  igw: string;
  igwColor?: string;
  x?: number | string;
  y?: number | string;
  isSecond?: boolean;
  isScreenShot?: boolean;
}

/**
 * StatusTooltip component displays information in a tooltip style.
 * @param ipx - The value for internal services (سرویس‌های داخلی).
 * @param ipxColor - The color of the internal services value. Default is white.
 * @param igw - The value for external services (سرویس‌های خارجی).
 * @param igwColor - The color of the external services value. Default is white.
 * @param x - The x-coordinate for the tooltip position.
 * @param y - The y-coordinate for the tooltip position.
 * @param isSecond - Flag indicating if it is the second tooltip.
 * @param isScreenShot - Flag indicating if the tooltip is for a screenshot, triggering a pulse animation.
 * @returns JSX element representing the StatusTooltip.
 */
const StatusTooltip: FC<Props> = ({
  ipx,
  ipxColor = "#fff",
  igw,
  igwColor = "#fff",
  x,
  y,
  isSecond,
  isScreenShot,
}) => {
  return (
    <>
      {isSecond ? (
        <Box
          sx={{
            transition: "all .2s ease",
            width: "160px",
            height: "160px",
            borderRadius: "2rem",
            position: isSecond ? "static" : "fixed",
            zIndex: isSecond ? "auto" : "100",
            top: y,
            left: x,
            background: "#000000aa",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingRight: "1rem",
            gap: "1rem",
            ...(isScreenShot && {
              // Conditional animation based on isScreenShot
              animation: "pulseAnimation  2s infinite",
              "@keyframes pulseAnimation": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.1)" },
                "100%": { transform: "scale(1)" },
              },
            }),
          }}
        >
          {" "}
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
      ) : (
        <Box
          sx={{
            transition: "all .2s ease",
            width: "160px",
            height: "160px",
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
          {" "}
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
      )}
    </>
  );
};

export default StatusTooltip;
