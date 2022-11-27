import { FC, ReactNode, useMemo } from "react";
import CSS from "csstype";
import classNames from "classnames";
type IColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link"
  | "primary-outline"
  | "secondary-outline"
  | "success-outline"
  | "danger-outline"
  | "warning-outline"
  | "info-outline"
  | "light-outline"
  | "dark-outline";
interface Props {
  children: ReactNode | JSX.Element;
  className?: string;
  style?: CSS.Properties;
  type?: "button" | "submit" | "reset";
  disable?: boolean;
  rounded?: boolean;
  onClick?: any;
  color?: IColor;
  handleClick?: any;
}
const Button: FC<Props> = ({
  children,
  className,
  style,
  type = "button",
  disable = false,
  rounded = false,
  onClick,
  color = "primary",
  handleClick,
}) => {
  const typesBtn = useMemo(
    () => ({
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800",
      secondary:
        "bg-purple-600 text-white hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800",
      success:
        "bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 active:bg-green-700",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-800",
      warning:
        " bg-yellow-500 text-white  hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-700",
      info: "bg-blue-400 text-white hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-600 ",
      light:
        " bg-gray-200 text-gray-700 hover:bg-gray-300 focus:bg-gray-300  active:bg-gray-400 ",
      dark: "bg-gray-800 text-white hover:bg-gray-900 focus:bg-gray-900  active:bg-gray-900",
      link: "text-blue-600 border-none",
      "primary-outline":
        "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
      "secondary-outline":
        "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white",
      "success-outline":
        "border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
      "danger-outline":
        "border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
      "warning-outline":
        "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white",
      "info-outline":
        "border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white",
      "light-outline":
        "border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-white",
      "dark-outline":
        "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white",
    }),
    []
  );
  return (
    <button
      type={type}
      className={classNames(
        typesBtn[color],
        "inline-block border-2 px-6 py-2.5 font-medium text-xs leading-tight rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out",
        className,
        { "rounded-full": rounded, "pointer-events-none opacity-60": disable }
      )}
      style={{ ...style }}
      disabled={disable}
      onClick={onClick || (handleClick && handleClick)}
    >
      {children}
    </button>
  );
};

export default Button;
