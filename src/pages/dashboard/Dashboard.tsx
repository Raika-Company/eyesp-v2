import {Box} from "@mui/material";
import {FC} from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

const Dashboard: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "2rem",
      }}
    >
      <LeftSide />
      <RightSide />
    </Box>
  );
};

export default Dashboard;
