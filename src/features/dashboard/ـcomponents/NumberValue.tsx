import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";

/**
 * Props for the NumberValue component.
 */
interface Props {
  /**
 * The numerical value to be displayed.
 */
  value: number;
  /**
 * The title or label associated with the value.
 */
  title: string;
  /**
 * The unit of measurement for the value.
 */
  unit: string;
}

/**
 * NumberValue component displays a numerical value with a title and unit.
 * It is designed to be responsive to different screen sizes.
 *
 * @component
 * @param {Props} props - The properties of the NumberValue component.
 * @returns {JSX.Element} The rendered NumberValue component.
 */
const NumberValue: FC<Props> = ({ value, title, unit }) => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("lg"));

  /**
 * Helper function to render a styled text element.
 * @param {string} value - The text content.
 * @param {string} minWidth - The minimum width of the text element.
 * @returns {JSX.Element} The styled text element.
 */
  const renderText = (value: string, minWidth = "initial") => {
    return (
      <Typography
        variant="body1"
        sx={{
          color: "#7A7775",
          background: "#1D1E20",
          borderRadius: ".5rem",
          paddingY: ".5rem",
          paddingX: ".8rem",
          fontWeight: "600",
          textAlign: "center",
          minWidth,
        }}
      >
        {value}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Title with a specified minimum width */}
      {renderText(title, "4rem")}
      {/* Box containing the numerical value with responsive styling */}
      <Box
        sx={{
          background: "#232629",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: isXlgScreen ? "7rem" : "6rem",
          color: "#C7C6C3",
          marginTop: "-.5rem",
          marginBottom: "-.5rem",
          paddingY: ".5rem",
          borderRadius: ".5rem",
          zIndex: "1",
        }}
      >
        {/* Numerical value with responsive font size */}
        <Typography
          sx={{
            fontWeight: "800",
            fontSize: isXlgScreen ? "3.6rem !important" : "2.5rem !important",
            marginBottom: "-.5rem",
          }}
        >
          {value}
        </Typography>
      </Box>
      {/* Unit with default styling */}
      {renderText(unit)}
    </Box>
  );
};

export default NumberValue;
