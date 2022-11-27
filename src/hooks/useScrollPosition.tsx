import { useEffect, useState } from "react";

const useScrollPosition = (
  scrollFactorX: number = 0,
  scrollFactorY: number = 0
) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setPosition({ x: window.scrollX, y: window.scrollY });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return { x: position.x * scrollFactorX, y: position.y * scrollFactorY };
};
export default useScrollPosition;
