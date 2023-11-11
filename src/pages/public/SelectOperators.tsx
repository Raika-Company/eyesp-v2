import { Select, styled } from "@mui/material";

const SelectOperators = styled(Select)(({ theme }) => ({
  height: "60%",
  borderRadius: "1.25em",
  backgroundColor: "#2B2E31",
  paddingX: "0.8em",
  paddingY: "0.4em",
  paddingBottom: "0",
  ".MuiSelect-icon": {
    right: "auto",
    left: "7px",
    color: "#7A7775",
  },
  [`.${theme.breakpoints.down("sm")} .MuiSelect-icon`]: {
    left: "4px",
  },
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  ".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
  {
    paddingRight: ".7em",
  },
}));

export { SelectOperators };
