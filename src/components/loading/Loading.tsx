import { FC } from "react";
import CSS from "csstype";
import classNames from "classnames";

interface Props {
  height?: number | string;
  style?: CSS.Properties;
  className?: string;
}
const Loading: FC<Props> = ({ height, style, className }) => {
  return (
    <div
      className={classNames("loading w-full", className)}
      style={{ ...style, height: height ? height : "100%" }}
    >
      <div className="flex">
        <span className="animate-loading mx-2 w-6 h-6 rounded-full bg-green-600"></span>
        <span className="animate-loading_delay  mx-2 w-6 h-6 rounded-full bg-green-600"></span>
        <span className="animate-loading mx-2 w-6 h-6 rounded-full bg-green-600"></span>
      </div>
    </div>
  );
};

export default Loading;
