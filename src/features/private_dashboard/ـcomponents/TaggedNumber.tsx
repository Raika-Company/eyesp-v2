import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  value: number;
  title: string;
}

const TaggedNumber: FC<Props> = ({ value, title }) => {
  return (
    <Stack alignItems="center">
      <Typography
        sx={{
          fontSize: "2.5rem",
          fontWeight: "bold",
        }}
      >
        {value}
      </Typography>
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
