import { Card, styled } from "@mui/material";

const CardContainer = styled(Card)(({ theme }) => ({
  borderRadius: ".75rem",
  backdropFilter: "blur(35px)",
  "&::-webkit-scrollbar": {
    display: "none",
  },

  "& scrollbarWidth": "none",
  background: "#2B2E31",
  boxShadow: "0px 4px 40px 0px rgba(255, 255, 255, 0.10)",
  margin: "3.5rem",
}));

export default CardContainer;
