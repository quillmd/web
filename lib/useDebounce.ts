import debounce from "lodash.debounce";
import { useCallback, useEffect, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  const debouncedFnRef = useRef<(...args: Parameters<T>) => void>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    debouncedFnRef.current = debounce((...args: Parameters<T>) => {
      callbackRef.current(...args);
    }, delay);
  }, [delay]);

  const debouncedFn = useCallback((...args: Parameters<T>) => {
    if (debouncedFnRef.current) {
      debouncedFnRef.current(...args);
    }
  }, []);

  return debouncedFn;
}
