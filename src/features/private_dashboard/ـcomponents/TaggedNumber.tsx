import { Stack, Typography } from "@mui/material";
import { FC } from "react";

/**
 * Props interface for the TaggedNumber component.
 */
interface TaggedNumberProps {
  /**
   * The numeric value to be displayed.
   */
  value: number;

  /**
   * The title or tag associated with the numeric value.
   */
  title: string;
}

/**
 * A functional React component that displays a numeric value along with an associated title or tag.
 * This component is designed to visually represent a tagged numeric value.
 *
 * @component
 * @param {TaggedNumberProps} props - The properties of the TaggedNumber component.
 * @returns {JSX.Element} A JSX.Element representing the TaggedNumber component.
 *
 * @example
 * // Example usage of TaggedNumber component
 * <TaggedNumber value={3} title="Issues" />
 */
const TaggedNumber: FC<TaggedNumberProps> = ({ value, title }) => {
  return (
    <Stack alignItems="center">
      {/* Numeric value with styling */}
      <Typography
        sx={{
          fontSize: "2.5rem !important",
          fontWeight: "bold",
        }}
      >
        {value}
      </Typography>
      {/* Title or tag associated with the numeric value */}
      <Typography
        sx={{
          marginTop: "-1rem",
        }}
        color="#7A7775"
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default TaggedNumber;
