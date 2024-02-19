import { Box, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { MessageContext } from "../../context/MessageContext";

/**
 * Chat Component
 *
 * This component is responsible for displaying a message obtained from the MessageContext.
 * It utilizes Material-UI components (Box and Typography) for styling.
 *
 * @component
 */
const Chat: FC = () => {
  const { message } = useContext(MessageContext) || {};

  return (
    <Box display="flex" justifyContent="center">
      <Typography>{message}</Typography>
    </Box>
  );
};
export default Chat;
