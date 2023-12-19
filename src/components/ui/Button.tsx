import { FC } from "react";
import { Button as MuiButton } from "@mui/material";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disable: boolean;
}

export const Button: FC<ButtonProps> = ({ text, onClick, disable }) => (
  <MuiButton
    onClick={onClick}
    sx={{
      background: disable ? "#66666666" : "#666",
      color: disable ? "#ffffff88" : "#FFF",
      fontSize: "1.2rem",
      border: "none",
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: ".5rem",
      cursor: "pointer",
      ":hover": {
        background: "#66666666",
      },
    }}
    aria-label={text}
  >
    {text}
  </MuiButton>
);
