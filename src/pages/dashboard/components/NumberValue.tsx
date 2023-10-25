import {Box, Typography} from "@mui/material";
import {FC} from "react";

interface Props {
  value: number;
  title: string;
  unit: string;
}

const NumberValue: FC<Props> = ({value, title, unit}) => {
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
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderText(title, "5.5rem")}
      <Typography
        sx={{
          background: "#232629",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "8rem",
          color: "#C7C6C3",
          marginTop: "-.5rem",
          marginBottom: "-.5rem",
          fontSize: "4rem",
          paddingX: "2.5rem",
          borderRadius: ".5rem",
          zIndex: "1",
          fontWeight: "800",
        }}
      >
        {value}
      </Typography>
      {renderText(unit)}
    </Box>
  );
};

export default NumberValue;
