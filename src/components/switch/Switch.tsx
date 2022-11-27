import classNames from "classnames";
import { FC, useState } from "react";
import HoverEffect from "../hoverEffect/HoverEffect";
interface Props {
  initialValue?: boolean;
}
const Switch: FC<Props> = ({ initialValue }) => {
  const [state, setState] = useState(initialValue);
  return (
    <div className="switch-btn flex justify-center " style={{margin:'50px'}}>
      <label htmlFor="switch-btn">
        <div
          className={classNames(
            "w-10 h-5 rounded-full relative cursor-pointer",
            { "bg-gray-300": !state, "bg-blue-100": state }
          )}
        >
            <div
              className={classNames(
                `circle w-4 h-4 rounded-full absolute top-1/2
           -translate-y-1/2 transition-all`,
                {
                  "bg-white left-3/4 -translate-x-1/2": !state,
                  "bg-blue-500 left-0.5": state,
                }
              )}
            >

              <HoverEffect />
            </div>
            <input
              id="switch-btn"
              type={"checkbox"}
              className="hidden"
              onChange={() => setState((state) => !state)}
            />
        </div>
      </label>
    </div>
  );
};

export default Switch;
