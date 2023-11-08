import { Select, styled } from "@mui/material";

const SelectButton = styled(Select)({
  height: "60%",
  borderRadius: "1.25rem",
  //   border: "1px solid #DDD",
  backgroundColor: "#2B2E31",
  paddingX: "0.8rem",
  paddingY: "0.4rem",
  paddingBottom: "0",
  ".MuiSelect-icon": {
    right: "auto",
    left: "7px",
    color: "white",
    visibility: "hidden",
  },
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
});

export { SelectButton };
