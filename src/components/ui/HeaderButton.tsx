import { Button, styled, ButtonProps } from "@mui/material";

/**
 * Props interface for the HeaderButton component.
 */
interface CustomButtonProps extends ButtonProps {
  /**
 * A string indicating whether the button is clicked.
 * If "true", the button will have a different style indicating it is clicked.
 */
  clicked: string; // Changed to string type
}

/**
 * Styled component representing a header button.
 *
 * This component is a styled MUI Button with additional styling based on the "clicked" prop.
 *
 * @component
 * @example
 * // Usage of HeaderButton with the "clicked" prop:
 * <HeaderButton clicked="true" onClick={handleClick}>
 *   Click Me
 * </HeaderButton>
 *
 * @param {HeaderButtonProps} clicked - Indicates whether the button is clicked.
 * @returns {JSX.Element} - React JSX element representing the header button.
 */
const HeaderButton = styled(Button)<CustomButtonProps>(({ clicked }) => ({
  height: "60%",
  paddingInline: "3rem",
  borderRadius: "3.43106rem",
  // Dynamic styles based on the "clicked" prop
  backgroundColor: clicked === "true" ? "#FFFFFF" : "#2B2E31",
  color: clicked === "true" ? "#000000" : "#FFFFFF",
  "&:hover": {
    backgroundColor: clicked === "true" ? "#FFFFFF" : "#2B2E31",
    color: clicked === "true" ? "#000000" : "#FFFFFF",
  },
}));

export { HeaderButton };
