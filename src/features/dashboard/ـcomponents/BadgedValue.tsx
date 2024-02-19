import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";

/**
 * Props for the BadgedValue component.
 */
interface Props {
  /**
 * The name or label for the badge.
 */
  badgeName: string;
  /**
 * The numerical value to be displayed in the badge.
 */
  value: number;
  /**
 * The optional unit of measurement for the value. Defaults to "Mbps".
 */
  unit?: string;
}

/**
 * BadgedValue component displays a value with an associated badge name and unit.
 * It is responsive to different screen sizes.
 *
 * @component
 * @param {Props} props - The properties of the BadgedValue component.
 * @returns {JSX.Element} The rendered BadgedValue component.
 */
const BadgedValue: FC<Props> = ({ badgeName, value, unit = "Mbps" }) => {
  /**
   * Accessing theme and media query hooks from Material-UI.
   */
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const isLgScreen = useMediaQuery(theme.breakpoints.up("lg"));

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
      {/* Stack for displaying the main value and unit */}
      <Stack direction="row-reverse" alignItems="baseline">
        <Typography
          fontSize={
            isSmScreen
              ? "1.5rem !important"
              : isMdScreen
                ? "2rem !important"
                : isLgScreen
                  ? "2.5rem !important"
                  : "2rem !important"
          }
        >
          {value.toLocaleString()}
        </Typography>
        <Typography>{unit}</Typography>
      </Stack>
      {/* Badge name displayed above the value */}
      <Typography
        sx={{
          textAlign: "center",
          background: "#1D1E20",
          paddingY: ".5rem",
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
