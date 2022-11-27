import { useEffect, useState } from "react";
const getScrollValue = () => {
  const { scrollY, scrollX } = window;
  return { scrollY, scrollX };
};
const useWindowScroll = () => {
  const [scrollValue, setScrollValue] = useState<{
    scrollY: number;
    scrollX: number;
  }>(getScrollValue());

  useEffect(() => {
    const handleScroll = () => {
      setScrollValue(getScrollValue());
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return { scrollY: scrollValue.scrollY, scrollX: scrollValue.scrollX };
};
export default useWindowScroll;
