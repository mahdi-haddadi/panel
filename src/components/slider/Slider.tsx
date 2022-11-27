// import {
//   Dispatch,
//   FC,
//   SetStateAction,
//   useEffect,
//   useRef,
//   useCallback,
// } from "react";
// import useToggle from "../../hooks/useToggle";
// interface Props {
//   value: number;
//   setValue: Dispatch<SetStateAction<number>>;
//   step?: number;
//   min?: number;
//   max?: number;
// }
// const Slider: FC<Props> = ({ setValue, value, step = 1, max, min }) => {
//   const { close: up, open: down, state: dragging } = useToggle(false);

//   const sliderTrackRef = useRef<HTMLDivElement>(null);
//   const sliderContainerRef = useRef<HTMLDivElement>(null);
//   const thumbRef = useRef<HTMLButtonElement>(null);

//   useEffect(() => {
//     const { left, width } = (
//       sliderContainerRef.current as HTMLElement
//     )?.getBoundingClientRect();

//     const handleMove = (e: MouseEvent) => {
//       if (dragging) {
//         const offset = e.pageX - left;
//         const precentValue = Math.floor((offset * 100) / width);
//         if (precentValue >= 0 && precentValue <= 100) {
//           setValue(precentValue);
//         }
//       }
//     };
//     window.addEventListener("mousemove", handleMove);
//     window.addEventListener("mouseup", up);
//     return () => {
//       window.removeEventListener("mousemove", handleMove);
//       window.removeEventListener("mouseup", up);
//     };
//   }, [dragging, setValue, up]);

//   useEffect(() => {
//     if (step > 1) {
//       // console.log(Math.round(value));
//       const stepValue = 100 / step
//       console.log(value % stepValue);
//     }
//   }, [step, value]);

//   const handleClickOnTrack = useCallback(
//     (e: any) => {
//       const { left, width } = (
//         sliderContainerRef.current as HTMLElement
//       )?.getBoundingClientRect();
//       const offset = e.pageX - left;
//       const precentValue = Math.floor((offset * 100) / width);
//       if (precentValue >= 0 && precentValue <= 100) {
//         setValue(precentValue);
//       }
//     },
//     [setValue]
//   );

//   return (
//     <div
//       className="slider-container w-full h-1 relative my-20"
//       ref={sliderContainerRef}
//     >
//       <div
//         ref={sliderTrackRef}
//         className="slider-track w-full h-full bg-black/10"
//         onClick={handleClickOnTrack}
//       >
//         <div
//           className="track-progress h-full bg-blue-500"
//           style={{ width: `${value}%` }}
//         />
//       </div>
//       <button
//         style={{ left: `${value}%` }}
//         ref={thumbRef}
//         className="thumb w-4 h-4 bg-blue-400 rounded-full select-none absolute top-1/2 -translate-y-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2 cursor-pointer focus:scale-110 focus:opacity-70"
//         onMouseDown={down}
//       ></button>
//     </div>
//   );
// };

// export default Slider;

import { Fragment } from "react";
import SliderRange from "rc-slider";
import "rc-slider/assets/index.css";
const Slider = ({ ...rest }) => {
  return (
    <Fragment>
      <SliderRange {...rest} />
    </Fragment>
  );
};

export default Slider;
