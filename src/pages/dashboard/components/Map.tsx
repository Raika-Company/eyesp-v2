import {SvgIcon, useMediaQuery, useTheme} from "@mui/material";
import {FC} from "react";
import MapPaths from "./MapPaths";

const Map: FC = () => {
  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <SvgIcon
      sx={{
        width: "100%",
        height: "100%",
        paddingY: !isLgScreen ? "2rem" : "",
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
