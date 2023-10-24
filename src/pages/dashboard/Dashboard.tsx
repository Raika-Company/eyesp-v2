import {Box} from "@mui/material";
import {FC} from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import Map from "./components/Map";

const Dashboard: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        gap: "2rem",
      }}
    >
      <LeftSide />
      <Box
        sx={{
          minWidth: "60rem",
        }}
      >
        <Map />
      </Box>
      <RightSide />
    </Box>
  );
};

export default Dashboard;
