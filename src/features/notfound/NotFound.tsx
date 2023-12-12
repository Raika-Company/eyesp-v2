import { Typography, Container, Box, Button } from "@mui/material";
import { keyframes } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import React, { startTransition } from "react";

// Keyframes for animations
const colorSlide = keyframes`
  0% { background-color: #2B2E31; } 
  25% { background-color: #232629; } 
  50% { background-color: #4D765F; } 
  75% { background-color: #000000; } 
  100% { background-color: #2B2E31; } 
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    startTransition(() => {
      navigate("/");
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "white",
        animation: `${colorSlide} 15s cubic-bezier(0.075, 0.82, 0.165, 1) infinite`,
        ".text-center": {
          textAlign: "center",
          "h1, h3": {
            margin: "10px",
            cursor: "default",
            ".fade-in": {
              animation: `${fadeIn} 2s ease infinite`,
            },
          },
          h1: {
            fontSize: "8em",
            transition: "font-size 200ms ease-in-out",
            borderBottom: "1px dashed white",
            "& span": {
              ":nth-of-type(1)": { animationDelay: "200ms" },
              ":nth-of-type(2)": { animationDelay: "300ms" },
              ":nth-of-type(3)": { animationDelay: "400ms" },
            },
          },
          button: {
            border: "1px solid white",
            background: "transparent",
            outline: "none",
            padding: "10px 20px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
            transition: "background-color 200ms ease-in",
            margin: "20px 0",
            "&:hover": {
              backgroundColor: "white",
              color: "#555",
              cursor: "pointer",
            },
          },
        },
      }}
    >
      <Box className="text-center">
        <Typography
          variant="h1"
          component="h1"
          style={{ cursor: "default", margin: "10px" }}
        >
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </Typography>
        <Typography
          variant="h3"
          component="h3"
          style={{ cursor: "default", margin: "10px" }}
        >
          صفحه‌ی مورد نظر پیدا نشد
        </Typography>
        <Button onClick={handleNavigate}>بازگشت به صفحه اصلی</Button>
      </Box>
    </Box>
  );
};

export default NotFound;
