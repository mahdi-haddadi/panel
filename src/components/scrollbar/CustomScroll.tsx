import classNames from "classnames";
import { FC, ReactNode, useCallback, useRef, useState, useEffect } from "react";
interface Props {
  children: ReactNode;
  className?: string;
  minHeightScrollThumb?: number;
  classNameContainer?:string
}

const CustomScroll: FC<Props> = ({
  children,
  className,
  classNameContainer,
  minHeightScrollThumb = 20,
  ...rest
}) => {
  const [scrollBoxHeight, setScrollBoxHeight] = useState(minHeightScrollThumb);
  const [scrollBoxTop, setScrollBoxTop] = useState(0);
  const [hover, setHover] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0);

  const isHover = useCallback(() => {
    setHover(true);
  }, []);
  const isNotHover = useCallback(() => {
    setHover(false);
  }, []);

  const hostRef = useRef<any>();

  const handleScroll = useCallback(() => {
    if (!hostRef) return;
    const scrollHostElement = hostRef?.current;
    const { offsetHeight, scrollHeight, scrollTop }: any = scrollHostElement;
    let newTop =
      (parseInt(scrollTop, 10) / parseInt(scrollHeight, 10)) * offsetHeight;
    newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
    setScrollBoxTop(newTop);
  }, [scrollBoxHeight]);

  const handelMouseUp = useCallback(
    (e: any) => {
      if (isDraggable) {
        e.preventDefault();
        setIsDraggable(false);
      }
    },
    [isDraggable]
  );

  const handelMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDraggable) {
        e.preventDefault();
        e.stopPropagation();
        const scrollHostElement = hostRef.current;
        const { scrollHeight, offsetHeight }: any = scrollHostElement;
        let deltaY = e.clientY - lastScrollThumbPosition;
        let percentage = deltaY * (scrollHeight / offsetHeight);

        setScrollThumbPosition(e.clientY);
        setScrollBoxTop(
          Math.min(
            Math.max(0, scrollBoxTop + deltaY),
            offsetHeight - scrollBoxHeight
          )
        );
        scrollHostElement.scrollTop = Math.min(
          scrollHostElement.scrollTop + percentage,
          scrollHeight - offsetHeight
        );
      }
    },
    [isDraggable, lastScrollThumbPosition, scrollBoxHeight, scrollBoxTop]
  );

  const handleMouseDownOnThumb = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollThumbPosition(e.clientY);
    setIsDraggable(true);
  }, []);

  useEffect(() => {
    const scrollHostElement = hostRef?.current;
    const { clientHeight, scrollHeight }: any = scrollHostElement;
    const scrollThumbPercentage = clientHeight / scrollHeight;
    const scrollThumbHeight = Math.max(
      Math.round(scrollThumbPercentage * clientHeight),
      minHeightScrollThumb
    );

    setScrollBoxHeight(scrollThumbHeight);
    scrollHostElement.addEventListener("scroll", handleScroll);
    return () => {
      scrollHostElement.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, minHeightScrollThumb]);

  useEffect(() => {
    document.addEventListener("mouseup", handelMouseUp);
    document.addEventListener("mouseleave", handelMouseUp);
    document.addEventListener("mousemove", handelMouseMove);

    return () => {
      document.removeEventListener("mouseup", handelMouseUp);
      document.removeEventListener("mouseleave", handelMouseUp);
      document.removeEventListener("mousemove", handelMouseMove);
    };
  }, [handelMouseMove, handelMouseUp]);

  return (
    <div
      className={classNames(classNameContainer,"scroll-container relative h-full")}
      onMouseOver={isHover}
      onMouseOut={isNotHover}
    >
      <div
        className={classNames(
          className,
          "scroll-host overflow-auto h-full relative"
        )}
        ref={hostRef}
        {...rest}
      >
        {children}
        <div
          className="scroll-bar fixed top-0 bottom-0 w-2 h-full bg-slate-400 rounded-lg transition-all"
          style={{ width: hover ? "10px" : "5px" }}
        >
          <div
            className="scroll-thumb w-full top-0 absolute bg-slate-600 rounded-lg"
            onMouseDown={handleMouseDownOnThumb}
            onMouseUp={handelMouseUp}
            style={{ height: scrollBoxHeight, top: scrollBoxTop }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomScroll;
