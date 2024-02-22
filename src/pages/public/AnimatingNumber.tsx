import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import usePrevious from "../../hooks/usePrevious";
import { Box, Typography, useTheme } from "@mui/material";
import "./AnimatingNumber.css";

// Helper function doesn't need changes for TypeScript, but let's add return type
const formatForDisplay = (number: number = 0): string[] => {
  return parseFloat(Math.max(number, 0).toString())
    .toFixed(2)
    .split("")
    .reverse();
};

interface NumberColumnProps {
  digit: string;
  delta: string | null;
}

const NumberColumn = ({ digit, delta }: NumberColumnProps) => {
  const numberColumnRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<number>(0);
  const [animationClass, setAnimationClass] = useState<string | null>(null);
  const previousDigit = usePrevious(digit);
  const columnContainer = useRef<HTMLDivElement>(null);

  const setColumnToNumber = (number: string) => {
    if (columnContainer.current) {
      setPosition(columnContainer.current.clientHeight * parseInt(number, 10));
    }
  };

  useEffect(() => {
    setAnimationClass(previousDigit !== digit ? delta : null);
  }, [delta, digit, previousDigit]);

  useEffect(() => {
    if (!animationClass) return;
    const timer = setTimeout(() => {
      setAnimationClass(null);
    }, 201);

    return () => clearTimeout(timer);
  }, [animationClass]);

  useEffect(() => {
    setColumnToNumber(digit);
  }, [digit]);

  return (
    <div style={{ position: "relative" }} ref={columnContainer}>
      <motion.div
        animate={{ y: -position }}
        className={`ticker-column ${animationClass || ""}`}
        style={{
          position: "absolute",
          height: "1000%",
          bottom: "0",
        }}
        ref={numberColumnRef}
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
          <div key={num} style={{ height: "10%" }}>
            <span>{num}</span>
          </div>
        ))}
      </motion.div>
      <Typography sx={{ visibility: "hidden" }}>0</Typography>
    </div>
  );
};

const DecimalColumn = () => {
  return (
    <div>
      <span>.</span>
    </div>
  );
};

interface AnimatingNumberProps {
  value: number;
}

const AnimatingNumber = ({ value }: AnimatingNumberProps) => {
  const theme = useTheme();
  const numArray = formatForDisplay(value);
  const previousNumber = usePrevious(value.toString());

  let delta: string | null = null;
  if (previousNumber !== undefined) {
    const previousNum = parseFloat(previousNumber); // Convert previousNumber to a number
    delta =
      value > previousNum
        ? "increase"
        : value < previousNum
        ? "decrease"
        : null;
  }

  return (
    <Box
      sx={{
        height: "100%",
        margin: "auto",
        display: "flex",
        overflow: "hidden",
        position: "relative",
        color: theme.palette.mode === "dark" ? "#fff" : "gray",
      }}
    >
      {numArray.map((number, index) =>
        number === "." ? (
          <DecimalColumn key={index} />
        ) : (
          <NumberColumn key={index} digit={number} delta={delta} />
        )
      )}
    </Box>
  );
};

export default AnimatingNumber;
