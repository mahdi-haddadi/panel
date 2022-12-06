import {
  cloneElement,
  FC,
  Fragment,
  memo,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import classNames from "classnames";
import useToggle from "../../hooks/useToggle";
import Portal from "../../utils/Portal";
import "./assets/tooltip.scss";

type IBgColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link";

interface ITooltip {
  children: ReactElement;
  content: string | JSX.Element | ReactNode;
  position: "top" | "bottom" | "left" | "right";
  bg?: IBgColor;
}

interface ITooltipContent {
  content: string | JSX.Element | ReactNode;
  position: "top" | "bottom" | "left" | "right";
  tooltipClass?: string;
  positionEl: { left: number; top: number };
}

const TooltipContent: FC<ITooltipContent> = memo(
  ({ content, position, tooltipClass, positionEl }) => {
    const tooltipEl = useRef<any>();
    useEffect(() => {
      const el = tooltipEl?.current;
      setTimeout(() => {
        if (position === "top") {
          el.style.top = `${positionEl.top - el.clientHeight}px`;
          el.style.left = `${positionEl.left}px`;
          el.style.transform = `translate(-50%, -15px)`;
        } else if (position === "bottom") {
          el.style.top = `${positionEl.top}px`;
          el.style.left = `${positionEl.left}px`;
          el.style.transform = `translate(-50%, 15px)`;
        } else if (position === "left") {
          el.style.top = `${positionEl.top}px`;
          el.style.left = `${positionEl.left - el.clientWidth}px`;
          el.style.transform = `translate(-15px, -50%)`;
        } else if (position === "right") {
          el.style.top = `${positionEl.top}px`;
          el.style.left = `${positionEl.left}px`;
          el.style.transform = `translate(15px, -50%)`;
        }
        el.style.opacity = "1";
      }, 100);
    }, [position, positionEl.left, positionEl.top]);

    const output = (
      <div
        className={classNames(tooltipClass)}
        style={{ zIndex: 99 }}
        ref={tooltipEl}
      >
        {content}
      </div>
    );
    return <Portal>{output}</Portal>;
  }
);

const Tooltip: FC<ITooltip> = ({
  children,
  content,
  position,
  bg = "dark",
}) => {
  const [positionEl, setPositionEl] = useState({ top: 0, left: 0 });
  const { close: hide, open: show, state: isShow } = useToggle();
  const bgColor = useMemo(
    () => ({
      primary: "bg-blue-600 text-white",
      secondary: "bg-purple-600 text-white",
      success: "bg-green-500 text-white",
      danger: "bg-red-600 text-white",
      warning: " bg-yellow-500 text-white",
      info: "bg-blue-400 text-white ",
      light: " bg-gray-200 text-gray-700 ",
      dark: "bg-gray-800 text-white",
      link: "text-blue-600 border-none",
    }),
    []
  );
  const borderColor = useMemo(
    () => ({
      primary: "blue-600",
      secondary: "purple-600",
      success: "green-500",
      danger: "red-600",
      warning: "yellow-500",
      info: "blue-400 ",
      light: "gray-200 ",
      dark: "gray-800",
      link: "blue-600 ",
    }),
    []
  );
  let tooltipClass = useMemo(
    () =>
      `${bgColor[bg]} absolute -translate-x-1/2 flex justify-center items-center px-2 py-3 rounded-md shadow-md opacity-0 transition-all -z-10 after:border-transparent after:h-0 after:w-0 after:absolute after:border-8 after:border-${borderColor[bg]}`,
    [bg, bgColor, borderColor]
  );
  const getPosition = useCallback(
    (e: any) => {
      const pos = e.currentTarget?.getBoundingClientRect();
      if (position === "top") {
        setPositionEl({
          top: pos.top + e.pageY,
          left: pos.left + pos.width / 2,
        });
      } else if (position === "left") {
        setPositionEl({
          top: pos.top + e.pageY + pos.height / 2,
          left: pos.left,
        });
      } else if (position === "bottom") {
        setPositionEl({
          top: pos.bottom + e.pageY - 50,
          left: pos.left + pos.width / 2,
        });
      } else if (position === "right") {
        setPositionEl({
          top: pos.top + e.pageY + pos.height / 2,
          left: pos.left + pos.width,
        });
      }
      show();
    },
    [position, show]
  );

  if (position === "top") {
    tooltipClass += ` after:top-full after:left-1/2 after:-ml-2 after:border-t-${borderColor[bg]}`;
  } else if (position === "left") {
    tooltipClass += ` after:top-1/2 after:left-full after:-ml-2 after:border-l-${borderColor[bg]} after:-translate-y-1/2`;
  } else if (position === "bottom") {
    tooltipClass += ` after:bottom-full after:left-1/2 after:-ml-2 after:border-b-${borderColor[bg]}`;
  } else if (position === "right") {
    tooltipClass += ` after:top-1/2 after:right-full after:-ml-2 after:border-l-${borderColor[bg]} after:-translate-y-1/2`;
  }

  return (
    <Fragment>
      {isShow && (
        <TooltipContent
          content={content}
          positionEl={positionEl}
          tooltipClass={tooltipClass}
          position={position}
        />
      )}

      {cloneElement(children, {
        onMouseLeave: () => hide(),
        onMouseEnter: getPosition,
        ...children.props,
      })}
    </Fragment>
  );
};
export default Tooltip;
