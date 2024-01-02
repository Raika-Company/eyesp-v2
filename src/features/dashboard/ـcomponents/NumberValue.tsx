import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";

interface Props {
  value: number;
  title: string;
  unit: string;
}

const NumberValue: FC<Props> = ({ value, title, unit }) => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("lg"));

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
      {renderText(title, "4rem")}
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
      {renderText(unit)}
    </Box>
  );
};

export default NumberValue;
