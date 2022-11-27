import { MouseEvent, Dispatch, SetStateAction } from "react";
export interface ICloneElement {
  element: HTMLElement | null;
  onClose: () => void;
  handleClick: (e: MouseEvent<HTMLElement>) => void;
  open: boolean;
  setEl: Dispatch<SetStateAction<HTMLElement | null>>;
}