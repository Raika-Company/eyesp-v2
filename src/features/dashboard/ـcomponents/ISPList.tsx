import React from "react";
import { InternalISPList } from "../LeftSide";
import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Props {
  isp: typeof InternalISPList;
  isLimited: boolean;
  style?: React.CSSProperties;
}
export const ISPList: React.FC<Props> = ({ isp, isLimited, style }) => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  const displayIsp = isLimited ? isp.slice(0, 3) : isp;
  const combinedStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    gap: isXlgScreen ? ".5rem" : "",
    marginY: "auto",
    ...style,
  };

  return (
    <Box sx={combinedStyles}>
      {displayIsp.map((isp) => (
        <Box key={isp.id}>
          <Stack
            // temporary
            direction="row-reverse"
            justifyContent="space-between"
            alignItems="center"
            marginX=".5rem"
          >
            {/* temporary */}
            <Stack direction="row-reverse" gap=".5rem">
              <Typography color="#7A7775">#{isp.id}</Typography>
              <Typography>{isp.name}</Typography>
            </Stack>
            <Typography color="#7A7775">{isp.speed}Mbps</Typography>
          </Stack>
          <Divider
            style={{
              background: "#35383B",
              margin: ".5rem",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ISPList;
