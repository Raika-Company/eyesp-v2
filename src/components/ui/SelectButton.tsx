import { Select, styled } from "@mui/material";

/**
 * A styled component for a custom Select button.
 *
 * This component provides a styled button for a custom Select. It extends the
 * base MUI `Select` component with additional styles for a customized appearance.
 *
 * @component
 * **/
const SelectButton = styled(Select)({
  height: "60%",
  borderRadius: "1.25rem",
  backgroundColor: "#2B2E31",

  paddingX: "0.8rem",
  paddingY: "0.4rem",
  paddingBottom: "0",
  ".MuiSelect-icon": {
    right: "auto",
    left: "7px",
  },
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  ".css-1t0qkoj-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1t0qkoj-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1t0qkoj-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
  {
    paddingRight: "5rem",
  },
});

export { SelectButton };
