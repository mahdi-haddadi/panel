import { useEffect, useState } from "react";
const getWindow = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number;
    height: number;
  }>(getWindow());
  useEffect(() => {
    const hendleResize = () => {
      setWindowDimensions(getWindow());
    };
    window.addEventListener("resize", hendleResize);
    return () => {
      window.removeEventListener("resize", hendleResize);
    };
  }, []);
  return { width: windowDimensions.width, height: windowDimensions.height };
};
export default useWindowDimensions;
