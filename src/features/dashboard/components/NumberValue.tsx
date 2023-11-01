import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import {FC} from "react";

interface Props {
  value: number;
  title: string;
  unit: string;
}

const NumberValue: FC<Props> = ({value, title, unit}) => {
  const theme = useTheme();
  const isXlgScreen = useMediaQuery(theme.breakpoints.up("x2"));

  const renderText = (value: string, minWidth = "initial") => {
    return (
      <Typography
        sx={{
          color: "#7A7775",
          background: "#1D1E20",
          borderRadius: ".5rem",
          paddingY: ".5rem",
          paddingX: "1rem",
          fontWeight: "600",
          fontSize: ".9rem",
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
      {renderText(title, "5.5rem")}
      <Box
        sx={{
          background: "#232629",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: isXlgScreen ? "8rem" : "7rem",
          color: "#C7C6C3",
          marginTop: "-.5rem",
          marginBottom: "-.5rem",
          borderRadius: ".5rem",
          zIndex: "1",
        }}
      >
        <Typography
          sx={{
            fontWeight: "800",
            fontSize: isXlgScreen ? "4rem" : "2.5rem",
            marginBottom: "-1rem",
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
