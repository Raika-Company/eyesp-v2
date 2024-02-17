import { FC } from "react";
import { Button as MuiButton } from "@mui/material";

interface ButtonProps {
  text: string;
  onClick: () => void;
  disable: boolean;
}

export const ClickableButton: FC<ButtonProps> = ({
  text,
  onClick,
  disable,
}) => (
  <MuiButton
    onClick={disable ? () => {} : onClick}
    sx={{
      background: disable ? "#66666666" : "#666",
      color: disable ? "#ffffff88" : "#FFF",
      fontSize: ".8rem",
      border: "none",
      width: { xs: "1.2rem", sm: "1.8rem", md: "2.2rem", lg: "2.5rem" },
      height: { xs: "1.2rem", sm: "1.8rem", md: "2.2rem", lg: "2.5rem" },
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
