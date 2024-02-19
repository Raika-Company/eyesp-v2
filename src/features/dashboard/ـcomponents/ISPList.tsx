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

/**
 * Props for the ISPList component.
 */
interface Props {
  /**
 * The list of ISPs to be displayed.
 */
  isp: typeof InternalISPList;
  /**
 * A boolean indicating whether to display a limited number of ISPs.
 */
  isLimited: boolean;
  /**
 * Additional CSS styles for the component.
 */
  style?: React.CSSProperties;
}

/**
 * ISPList component displays a list of ISPs with their details.
 * It allows customization by providing a list of ISPs, limiting the display,
 * and applying additional styles.
 *
 * @component
 * @param {Props} props - The properties of the ISPList component.
 * @returns {JSX.Element} The rendered ISPList component.
 */
export const ISPList: React.FC<Props> = ({ isp, isLimited, style }) => {
  /**
   * Accessing theme and media query hooks from Material-UI.
   */
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));
  /**
   * Determine the list of ISPs to be displayed based on the isLimited prop.
   */
  const displayIsp = isLimited ? isp.slice(0, 3) : isp;
  /**
   * Combine the provided styles with component-specific styles.
   */
  const combinedStyles = {
    display: "flex",
    flexDirection: "column",
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
              <Typography whiteSpace="nowrap">{isp.name}</Typography>
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
