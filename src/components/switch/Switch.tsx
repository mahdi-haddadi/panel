import classNames from "classnames";
import { FC, SetStateAction, Dispatch } from "react";
import CSS from "csstype";
import HoverEffect from "../hoverEffect/HoverEffect";

interface Props {
  checked?: boolean;
  setChecked?: () => void;
  style?: CSS.Properties;
  className?: string;
}
const Switch: FC<Props> = ({
  checked = false,
  setChecked,
  className,
  style,
}) => {
  return (
    <div
      className={classNames("switch-btn flex justify-center", className)}
      style={style}
    >
      <label htmlFor="switch-btn">
        <div
          className={classNames(
            "w-10 h-5 rounded-full relative cursor-pointer",
            { "bg-gray-300": !checked, "bg-blue-100": checked }
          )}
        >
          <div
            className={classNames(
              `circle w-4 h-4 rounded-full absolute top-1/2
           -translate-y-1/2 transition-all`,
              {
                "bg-white left-3/4 -translate-x-1/2": !checked,
                "bg-blue-500 left-0.5": checked,
              }
            )}
          >
            <HoverEffect />
          </div>
          <input
            id="switch-btn"
            type={"checkbox"}
            className="hidden"
            onChange={() => setChecked && setChecked()}
          />
        </div>
      </label>
    </div>
  );
};

export default Switch;
