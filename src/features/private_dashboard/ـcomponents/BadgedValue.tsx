import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

/**
 * Props interface for the BadgedValue component.
 */
interface BadgedValueProps {
  /**
   * The name of the badge.
   */
  badgeName: string;

  /**
   * The numeric value to be displayed.
   */
  value: number;

  /**
   * The unit of measurement for the value. Defaults to "Mbps".
   */
  unit?: string;
}

/**
 * A functional React component that displays a numeric value with an associated badge.
 * This component is designed to visually represent a specific metric or measurement.
 *
 * @component
 * @param {BadgedValueProps} props - The properties of the BadgedValue component.
 * @returns {JSX.Element} A JSX.Element representing the BadgedValue component.
 *
 * @example
 * // Example usage of BadgedValue component
 * <BadgedValue badgeName="Download Speed" value={25} unit="Mbps" />
 */
const BadgedValue: FC<BadgedValueProps> = ({ badgeName, value, unit = "Mbps" }) => {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: ".5rem",
        background: "#232629",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginY: "1rem",
      }}
    >
      <Stack direction="row-reverse" alignItems="baseline">
        <Typography fontSize="2.5rem">{value.toLocaleString()}</Typography>
        <Typography>{unit}</Typography>
      </Stack>

      <Typography
        sx={{
          textAlign: "center",
          background: "#1D1E20",
          paddingY: ".5rem",
          paddingX: "1rem",
          paddingBottom: "0",
          color: "##7A7775",
          position: "absolute",
          top: "-1.6rem",
          left: "1rem",
          minWidth: "4rem",
          borderTopLeftRadius: ".5rem",
          borderTopRightRadius: ".5rem",
          fontSize: ".8rem",
        }}
      >
        {badgeName}
      </Typography>
    </Box>
  );
};

export default BadgedValue;
