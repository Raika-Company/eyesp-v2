import { Box, Typography } from "@mui/material";
import AnimatingNumber from "./AnimatingNumber";
import useDebounceTime from "../../hooks/useDebounceTime";

// Define an interface for the component props
interface InfoBoxProps {
  iconSrc: string;
  title: string;
  value: number;
  isColumn?: boolean;
  isTestEnds?: boolean;
  unit?: string;
}

const InfoBox = ({
  iconSrc,
  title,
  value,
  isColumn = false, // Default value if not provided
  isTestEnds = false, // Default value if not provided
  unit = "", // Default value if not provided
}: InfoBoxProps) => {
  const debounceValue = useDebounceTime(value);
  return (
    <Box
      display="flex"
      flexDirection={isColumn ? "column" : "row"}
      justifyContent="center"
      alignItems="center"
      gap="0.25rem"
    >
      <Box
        display="flex"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          gap: ".2rem",
        }}
      >
        <img src={iconSrc} alt={title} />
        <Typography variant="h5" color="text.subTitle">
          {title}
        </Typography>
      </Box>
      {isTestEnds && (
        <Typography
          fontSize={isTestEnds ? "1.5rem !important" : ".875rem"}
          marginTop=".5rem"
          fontFamily="PeydaLight"
          color={isTestEnds ? "#676767" : "#878787"}
        >
          {debounceValue} {/* Use debounceValue instead of value */}
        </Typography>
      )}
      {!isTestEnds && <AnimatingNumber value={debounceValue} />}
      {isTestEnds && (
        <Typography variant="h6" color="text.subTitle" marginTop="-.8rem">
          {unit}
        </Typography>
      )}
    </Box>
  );
};

export default InfoBox;
