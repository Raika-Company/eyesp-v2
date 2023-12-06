import { Button, styled, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  clicked: string; // Changed to string type
}

const HeaderButton = styled(Button)<CustomButtonProps>(({ clicked }) => ({
  height: "60%",
  paddingInline: "3rem",
  borderRadius: "3.43106rem",
  backgroundColor: clicked === "true" ? "#FFFFFF" : "#2B2E31",
  color: clicked === "true" ? "#000000" : "#FFFFFF",
  "&:hover": {
    backgroundColor: clicked === "true" ? "#FFFFFF" : "#2B2E31",
    color: clicked === "true" ? "#000000" : "#FFFFFF",
  },
}));

export { HeaderButton };
