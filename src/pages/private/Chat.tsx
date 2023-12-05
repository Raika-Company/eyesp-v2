import { Box, Typography } from "@mui/material";
import React, { FC, useContext, useEffect, useState } from "react";
import { MessageContext } from "../../context/MessageContext";
interface props {}

const Chat: FC<props> = ({}) => {
  const { message } = useContext(MessageContext) || {};

  return (
    <Box display="flex" justifyContent="center">
      <Typography>{message}</Typography>
    </Box>
  );
};
export default Chat;
