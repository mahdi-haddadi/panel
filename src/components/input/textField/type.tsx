import { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from "react";
import CSS from "csstype";

interface IStyle {
  className?: string;
  style?: CSS.Properties;
}

interface ILable extends IStyle {
  content: JSX.Element | string;
}
interface IMultiline extends IStyle {
  minRows?: number;
  maxRows?: number;
}
interface IHelperText extends IStyle {
  content: string;
}
export interface IIcon extends IStyle {
  position: "end" | "start";
  icon: JSX.Element;
  onClick?: () => void;
}

export type variant = "standard" | "outlined" | "filled";
export type IColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "transparent";
export interface IInput extends IStyle {
  type?: HTMLInputTypeAttribute;
  size?: "sm" | "md" | "lg";
  required?: boolean;
  placeholder?: string;
  multiline?: IMultiline;
  label?: ILable;
  // ref
  id?: string;
  helperText?: IHelperText;
  fullWidth?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  readOnly?: boolean;
  icon?: IIcon[];
  color?: IColor;
  initialValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  // bg-blue-600 - bg-purple-600 - bg-green-500 - bg-red-600 - bg-yellow-500 - bg-blue-400 - bg-gray-200 - bg-gray-800
}
