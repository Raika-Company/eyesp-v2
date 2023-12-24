import { lazy } from "react";

const LastDis = lazy(() => import("../../features/lastDisorders/LastDis"));

const LastDisorders = () => {
  return <LastDis />;
};

export default LastDisorders;
