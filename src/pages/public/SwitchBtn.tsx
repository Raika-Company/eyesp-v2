import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React, { useState } from "react";
import etesal from "../../assets/images/etesal.svg";

/**
 * Props definition for the SwitchBtn component.
 */
interface SwitchBtnProps {
  textOn: string;
  textOff: string;
  onChange: (state: string) => void;
}

/**
 * SwitchBtn Component.
 *
 * This component is a styled switch button that allows users to toggle
 * between two states. It adjusts its style based on the current theme mode.
 *
 * @param {SwitchBtnProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered SwitchBtn component.
 */
const SwitchBtn: React.FC<SwitchBtnProps> = ({ textOn, textOff, onChange }) => {
  const theme = useTheme();
  const [on, setOn] = useState<boolean>(true);
  const colorOn = "#7FCD9F"; // Color for the 'on' state
  const colorOff = "#4E4E4E"; // Color for the 'off' state

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          ml: "1.5rem",
          gap: 3,
        }}
        onClick={() => {
          const newState = !on;
          setOn(newState);
          onChange(newState ? textOn : textOff);
        }}
      >
        <Box
          component="span"
          sx={{ color: on ? colorOn : colorOff, fontSize: "1.5rem" }}
        >
          {textOn}
        </Box>
        {/* Image always shown */}
        <img src={etesal} alt="etesal" />{" "}
        <Box
          component="span"
          sx={{ color: !on ? colorOn : colorOff, fontSize: "1.5rem" }}
        >
          {textOff}
        </Box>
      </Box>
    </Box>
  );
};

export default SwitchBtn;
