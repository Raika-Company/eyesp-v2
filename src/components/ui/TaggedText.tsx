import { Box, Typography } from "@mui/material";
import { FC } from "react";

/**
 * Props for the TaggedText component.
 */
interface Props {
  title: string;
  value: string;
}

/**
 * TaggedText component displays a tagged text with a title and a corresponding value.
 * @param title - The title for the tagged text.
 * @param value - The value to be displayed in the tagged text.
 * @returns JSX element representing the TaggedText.
 */
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
