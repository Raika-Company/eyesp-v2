import { useEffect, useRef } from "react";

const usePrevious = (value: string) => {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  });

  return valueRef.current;
};

export default usePrevious;
