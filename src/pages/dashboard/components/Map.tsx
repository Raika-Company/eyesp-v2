import {SvgIcon} from "@mui/material";
import {FC} from "react";
import MapPaths from "./MapPaths";
// import provinceCoords from "../../../../public/data/provincesCoords.json";

const Map: FC = () => {
  return (
    <SvgIcon
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 1130 1004"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <MapPaths />
      </svg>
    </SvgIcon>
  );
};

export default Map;
