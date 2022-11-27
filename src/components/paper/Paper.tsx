import classNames from "classnames";
import { FC, ReactNode } from "react";
import CSS from "csstype";
interface Props {
  children: ReactNode;
  className?: string;
  style?: CSS.Properties;
}
const Paper: FC<Props> = ({ children, className, style }) => {
  return (
    <div
      style={style}
      className={classNames(
        className,
        `paper opacity-100 transition-opacity bg-white text-black overflow-hidden min-w-[32px] min-h-[32px] max-w-xs rounded-lg shadow-lg inline-block`
      )}
    >
      {children}
    </div>
  );
};

export default Paper;
