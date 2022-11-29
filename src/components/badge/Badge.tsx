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
  | "dark";
interface Props {
  children: ReactNode;
  className?: string;
  style?: CSS.Properties;
  color?: IColor;
  value?: string | number;
  rounded?: boolean;
}
const Badge: FC<Props> = ({
  children,
  className,
  color = "primary",
  rounded = true,
  style,
  value,
}) => {
  const colorBadge = useMemo(
    () => ({
      primary: "bg-blue-600 text-white",
      secondary: "bg-purple-600 text-white",
      success: "bg-green-500 text-white ",
      danger: "bg-red-600 text-white ",
      warning: " bg-yellow-500 text-white  ",
      info: "bg-blue-400 text-white ",
      light: " bg-gray-200 text-gray-700 ",
      dark: "bg-gray-800 text-white ",
    }),
    []
  );
  return (
    <div className="container-badge relative">
      <div
        className={classNames(
          colorBadge[color],
          ` absolute text-xs`,
          className,
          {
            "rounded-full": rounded,
            "w-3 h-3": !value,
            "w-auto h-auto": value,
          }
        )}
        style={style}
      >
        {value}
      </div>
      {children}
    </div>
  );
};

export default Badge;
