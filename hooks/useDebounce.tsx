import { useState, useEffect } from "react";

export default function useDebounce<T>(value: T, wait = 0) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Update the inner state after <wait> ms
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    // Clear timeout in case a new value is received
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value, wait]);

  return debouncedValue;
}
