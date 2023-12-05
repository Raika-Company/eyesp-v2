import { Suspense, lazy } from "react";


const LastDis = lazy(() => import("../../features/lastDisorders/LastDis"));

const LastDisorders = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <LastDis />
    </Suspense>
  );
};

export default LastDisorders;
