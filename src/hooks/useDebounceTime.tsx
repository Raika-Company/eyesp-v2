import { useEffect, useRef } from "react";

function useDebounceTime<T>(value: T): T {
  const timeRef = useRef<number>(Date.now());
  const valueRef = useRef<T>(value);

  useEffect(() => {
    if (Date.now() - timeRef.current > 250) {
      valueRef.current = value;
      timeRef.current = Date.now();
    }
  }, [value]);

  return valueRef.current;
}

export default useDebounceTime;
