// import {
//   cloneElement,
//   FC,
//   Fragment,
//   memo,
//   ReactElement,
//   ReactNode,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   useCallback,
// } from "react";
// import classNames from "classnames";
// import useToggle from "../../hooks/useToggle";
// import Portal from "../../utils/Portal";
// import "./assets/tooltip.scss";

// type IBgColor =
//   | "primary"
//   | "secondary"
//   | "success"
//   | "danger"
//   | "warning"
//   | "info"
//   | "light"
//   | "dark"
//   | "link";

// interface ITooltip {
//   children: ReactElement;
//   content: string | JSX.Element | ReactNode;
//   position: "top" | "bottom" | "left" | "right";
//   bg?: IBgColor;
// }

// interface ITooltipContent {
//   content: string | JSX.Element | ReactNode;
//   position: "top" | "bottom" | "left" | "right";
//   tooltipClass?: string;
//   positionEl: { left: number; top: number };
// }

// const TooltipContent: FC<ITooltipContent> = memo(
//   ({ content, position, tooltipClass, positionEl }) => {
//     const tooltipEl = useRef<any>();
//     useEffect(() => {
//       const el = tooltipEl?.current;
//       setTimeout(() => {
//         if (position === "top") {
//           el.style.top = `${positionEl.top - el.clientHeight}px`;
//           el.style.left = `${positionEl.left}px`;
//           el.style.transform = `translate(-50%, -15px)`;
//         } else if (position === "bottom") {
//           el.style.top = `${positionEl.top}px`;
//           el.style.left = `${positionEl.left}px`;
//           el.style.transform = `translate(-50%, 15px)`;
//         } else if (position === "left") {
//           el.style.top = `${positionEl.top}px`;
//           el.style.left = `${positionEl.left - el.clientWidth}px`;
//           el.style.transform = `translate(-15px, -50%)`;
//         } else if (position === "right") {
//           el.style.top = `${positionEl.top}px`;
//           el.style.left = `${positionEl.left}px`;
//           el.style.transform = `translate(15px, -50%)`;
//         }
//         el.style.opacity = "1";
//       }, 100);
//     }, [position, positionEl.left, positionEl.top]);

//     const output = (
//       <div
//         className={classNames(tooltipClass)}
//         style={{ zIndex: 99 }}
//         ref={tooltipEl}
//       >
//         {content}
//       </div>
//     );
//     return <Portal>{output}</Portal>;
//   }
// );

// const Tooltip: FC<ITooltip> = ({
//   children,
//   content,
//   position,
//   bg = "dark",
// }) => {
//   const [positionEl, setPositionEl] = useState({ top: 0, left: 0 });
//   const { close: hide, open: show, state: isShow } = useToggle();
//   const bgColor = useMemo(
//     () => ({
//       primary: "bg-blue-600 text-white",
//       secondary: "bg-purple-600 text-white",
//       success: "bg-green-500 text-white",
//       danger: "bg-red-600 text-white",
//       warning: " bg-yellow-500 text-white",
//       info: "bg-blue-400 text-white ",
//       light: " bg-gray-200 text-gray-700 ",
//       dark: "bg-gray-800 text-white",
//       link: "text-blue-600 border-none",
//     }),
//     []
//   );
//   const borderColor = useMemo(
//     () => ({
//       primary: "blue-600",
//       secondary: "purple-600",
//       success: "green-500",
//       danger: "red-600",
//       warning: "yellow-500",
//       info: "blue-400 ",
//       light: "gray-200 ",
//       dark: "gray-800",
//       link: "blue-600 ",
//     }),
//     []
//   );
//   let tooltipClass = useMemo(
//     () =>
//       `${bgColor[bg]} absolute -translate-x-1/2 flex justify-center items-center px-2 py-3 rounded-md shadow-md opacity-0 transition-all -z-10 after:border-transparent after:h-0 after:w-0 after:absolute after:border-8 after:border-${borderColor[bg]}`,
//     [bg, bgColor, borderColor]
//   );
//   const getPosition = useCallback(
//     (e: any) => {
//       const pos = e.currentTarget?.getBoundingClientRect();
//       if (position === "top") {
//         setPositionEl({
//           top: pos.top + e.pageY,
//           left: pos.left + pos.width / 2,
//         });
//       } else if (position === "left") {
//         setPositionEl({
//           top: pos.top + e.pageY + pos.height / 2,
//           left: pos.left,
//         });
//       } else if (position === "bottom") {
//         setPositionEl({
//           top: pos.bottom + (e.pageY),
//           left: pos.left + pos.width / 2,
//         });
//       } else if (position === "right") {
//         setPositionEl({
//           top: pos.top + e.pageY + pos.height / 2,
//           left: pos.left + pos.width,
//         });
//       }
//       show();
//     },
//     [position, show]
//   );

//   if (position === "top") {
//     tooltipClass += ` after:top-full after:left-1/2 after:-ml-2 after:border-t-${borderColor[bg]}`;
//   } else if (position === "left") {
//     tooltipClass += ` after:top-1/2 after:left-full after:-ml-2 after:border-l-${borderColor[bg]} after:-translate-y-1/2`;
//   } else if (position === "bottom") {
//     tooltipClass += ` after:bottom-full after:left-1/2 after:-ml-2 after:border-b-${borderColor[bg]}`;
//   } else if (position === "right") {
//     tooltipClass += ` after:top-1/2 after:right-full after:-ml-2 after:border-l-${borderColor[bg]} after:-translate-y-1/2`;
//   }

//   return (
//     <Fragment>
//       {!isShow && (
//         <TooltipContent
//           content={content}
//           positionEl={positionEl}
//           tooltipClass={tooltipClass}
//           position={position}
//         />
//       )}

//       {cloneElement(children, {
//         onMouseLeave: () => hide(),
//         onMouseEnter: getPosition,
//         ...children.props,
//       })}
//     </Fragment>
//   );
// };
// export default Tooltip;

// ################################################################################################################################

import classNames from "classnames";
import { FC, ReactNode } from "react";

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

interface Props {
  children: ReactNode;
  content: string | JSX.Element | ReactNode;
  position: "left" | "right" | "top" | "bottom";
  bg?: IBgColor;
}

const Tooltip: FC<Props> = ({ children, content, position = 'bottom', bg }) => {
  const positioning = {
    top: "before:-top-3 before:-translate-y-full after:-top-3 after:border-t-gray-700",
    bottom:
      "before:-bottom-3 before:translate-y-full after:-bottom-3 after:border-b-gray-700",
    right:
      "before:-right-3 before:translate-x-full after:-right-[0.8rem] after:border-r-gray-700",
    left: "before:-left-3 before:-translate-x-full after:-left-[0.8rem] after:border-l-gray-700",
  };
  return (
    <div
      className={classNames(
        positioning[position],
        "px-4 relative before:z-10 before:absolute before:w-max before:max-w-xs before:bg-gray-700 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:h-0 after:w-0 after:border-8 after:invisible hover:before:visible hover:after:visible"
      )}
      data-tip={content}
    >
      {children}
    </div>
  );
};

export default Tooltip;

/*
<div className='flex items-center gap-3'>
  <div className='relative before:z-10 before:absolute before:left-1/2 before:-top-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full before:rounded-lg before:bg-gray-700 before:px-2 before:py-1.5 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:left-1/2 after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-t-gray-700 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible'
    data-tip='Improved Workflow'>
    <button className='py-1 px-2 capitalize bg-blue-500 text-white rounded-lg border border-blue-500 hover:border-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
      Beyond Builder
    </button>
  </div>
   top 
  <div className='relative before:z-10 before:absolute before:left-1/2 before:-bottom-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:translate-y-full before:rounded-lg before:bg-gray-700 before:px-2 before:py-1.5 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:left-1/2 after:-bottom-3 after:h-0 after:w-0 after:-translate-x-1/2 after:border-8 after:border-b-gray-700 after:border-l-transparent after:border-t-transparent after:border-r-transparent after:invisible hover:before:visible hover:after:visible'
    data-tip='Improved Workflow'>
    On Plain Text Bottom
  </div>
  bottom 
  <div className='relative before:z-10 before:absolute before:-right-3 before:top-1/2 before:w-max before:max-w-xs before:translate-x-full before:-translate-y-1/2 before:rounded-md before:bg-gray-700 before:px-3 before:py-2 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:-right-[0.8rem] after:top-1/2 after:h-0 after:w-0 after:translate-x-0 after:-translate-y-1/2 after:border-8 after:border-r-gray-700 after:border-l-transparent after:border-b-transparent after:border-t-transparent after:invisible hover:before:visible hover:after:visible'
    data-tip='to the next level 🚀'>
    <button className='py-1 px-2 capitalize bg-amber-500 text-white rounded-lg border border-amber-500 hover:border-amber-600 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'>
      Tailwind Button
    </button>
  </div>
  right 
  <div className='relative before:z-10 before:absolute before:-left-3 before:top-1/2 before:w-max before:max-w-xs before:-translate-x-full before:-translate-y-1/2 before:rounded-md before:bg-gray-700 before:px-3 before:py-2 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:-left-[0.8rem] after:top-1/2 after:h-0 after:w-0 after:translate-x-0 after:-translate-y-1/2 after:border-8 after:border-l-gray-700 after:border-r-transparent after:border-b-transparent after:border-t-transparent after:invisible hover:before:visible hover:after:visible'
    data-tip='to the next level 🚀'>
    At Left Too
  </div>
   left 
</div>
*/

// compere
// '  relative before:z-10 before:absolute before:w-max before:max-w-xs before:bg-gray-700 before:text-white before:invisible before:content-[attr(data-tip)] after:z-10 after:absolute after:h-0 after:w-0 after:border-8 after:invisible hover:before:visible hover:after:visible'
