import { useRef } from "react";

const useLongPress = (callback, threshold = 500) => {
  const timeoutRef = useRef(null);

  const start = () => {
    timeoutRef.current = setTimeout(() => {
      callback();
    }, threshold);
  };

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
};

export default useLongPress;
