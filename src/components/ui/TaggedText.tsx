import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  title: string;
  value: string;
}

const TaggedText: FC<Props> = ({ title, value }) => {
  return (
    <Box
      sx={{
        position: "relative",
        background: "#232629",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingX: "5rem",
        paddingY: "1rem",
        minWidth: "22rem",
        borderRadius: ".5rem",
        zIndex: "100",
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          background: "#1D1E20",
          paddingY: ".2rem",
          paddingX: "2rem",
          borderTopRightRadius: ".5rem",
          borderTopLeftRadius: ".5rem",
          top: "-1.8rem",
          right: "1rem",
          zIndex: "-1",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "2.2rem",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default TaggedText;
