import { FC } from "react";
import { Button as MuiButton } from "@mui/material";

/**
 * Props interface for the ClickableButton component.
 */
interface ButtonProps {
  text: string;
  onClick: () => void;
  disable: boolean;
}

/**
 * A customizable button component that can be clicked.
 *
 * The ClickableButton component provides a customizable button with options for text, click functionality, and disabled state.
 *
 * @component
 * @example
 * // Usage of ClickableButton with required props:
 * <ClickableButton text="Click Me" onClick={() => handleButtonClick()} disable={false} />
 *
 * @param {ClickableButtonProps} text - The text to be displayed on the button.
 * @param {ClickableButtonProps} onClick - The function to be called when the button is clicked.
 * @param {ClickableButtonProps} disable - A boolean flag indicating whether the button should be disabled.
 * @param {ClickableButtonProps} rest - Additional props from the MuiButton component.
 * @returns {JSX.Element} - React JSX element representing the ClickableButton.
 */
export const ClickableButton: FC<ButtonProps> = ({
  text,
  onClick,
  disable,
}) => (
  <MuiButton
    onClick={disable ? () => { } : onClick}
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
