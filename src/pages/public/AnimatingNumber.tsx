import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";

// Digit component for individual number animations
const Digit = ({ value }: { value: string }) => {
  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      style={{
        fontSize: "1.6rem",
        fontWeight: "bold",
        color: "white",
      }}
    >
      {value}
    </motion.div>
  );
};

const AnimatedNumber = ({ value }: { value: number }) => {
  const [digits, setDigits] = useState<string[]>([]);

  useEffect(() => {
    // Split number into individual digits
    setDigits(!value ? "0.00".split("") : value.toString().split(""));
  }, [value]);

  return (
    <Box
      sx={{
        mr: "-0.5rem",
        minWidth: "3.9rem",
        display: "flex",
        direction: "ltr",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AnimatePresence>
        {digits.map((digit, index) => (
          <Digit key={index} value={digit} />
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default AnimatedNumber;
