import {Box} from "@mui/material";
import {FC} from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import Map from "./components/Map";

const Dashboard: FC = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: "1rem",
      }}
    >
      <LeftSide />
      <Map />
      <RightSide />
    </Box>
  );
};

export default Dashboard;
