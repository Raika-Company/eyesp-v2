import { Box, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { MessageContext } from "../../context/MessageContext";

const Chat: FC = () => {
  const { message } = useContext(MessageContext) || {};

  return (
    <Box display="flex" justifyContent="center">
      <Typography>{message}</Typography>
    </Box>
  );
};
export default Chat;
