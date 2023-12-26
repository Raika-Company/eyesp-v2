import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  badgeName: string;
  value: number;
  unit?: string;
}

const BadgedValue: FC<Props> = ({ badgeName, value, unit = "Mbps" }) => {
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
        <Typography fontSize="2rem">{value.toLocaleString()}</Typography>
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
