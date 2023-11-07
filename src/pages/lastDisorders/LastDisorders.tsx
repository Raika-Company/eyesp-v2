import React from "react";
import Header from "../../components/ui/Header";
import { Typography } from "@mui/material";
import history from "../../assets/images/history.svg";

const LastDisorders = () => {
  return (
    <div>
      <Header
        title="رتبه بندی سرعت"
        iconPath={history}
        hasButton={true}
        selectTitle="ترتیب بندی براساس:"
        // onClick={toggleDialog}
      ></Header>
    </div>
  );
};

export default LastDisorders;
