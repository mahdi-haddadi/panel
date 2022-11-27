import classNames from "classnames";
import { FC, useMemo } from "react";
type IColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";
interface Props {
  className?: string;
  text?: JSX.Element | string;
  size?: "sm" | "md" | "lg";
  color?: IColor;
}
const LoadingSpin: FC<Props> = ({
  className,
  text,
  size = "md",
  color = "primary",
}) => {
  const sizeSpin = useMemo(
    () => ({
      sm: "w-4 h-4 border-2",
      md: "w-8 h-8 border-4",
      lg: "w-12 h-12 border-6",
    }),
    []
  );
  const colorSpin = useMemo(
    () => ({
      primary: "border-r-blue-600 border-l-blue-600 border-t-blue-600",
      secondary: "border-r-purple-600 border-l-purple-600 border-t-purple-600",
      success: "border-r-green-500 border-l-green-500 border-t-green-500",
      danger: "border-r-red-600 border-l-red-600 border-t-red-600",
      warning: "border-r-yellow-500 border-l-yellow-500 border-t-yellow-500",
      info: "border-r-blue-400 border-l-blue-400 border-t-blue-400",
      light: "border-r-gray-200 border-l-gray-200 border-t-gray-200",
      dark: "border-r-gray-800 border-l-gray-800 border-t-gray-800",
    }),
    []
  );
  return (
    <div className="flex justify-center items-center">
      <div
        className={classNames(
          `animate-spinner spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full ${sizeSpin[size]} ${colorSpin[color]}`,
          className
        )}
        role="status"
      >
        {text && text}
      </div>
    </div>
  );
};

export default LoadingSpin;
