import classNames from "classnames";
import { FC } from "react";
import { IInput } from "./TextField";

const TextFieldCore: FC<IInput> = ({
  id,
  placeholder,
  classNameInput,
  size,
  styleInput,
  icon,
  ...input
}) => {
  return (
    <input
      type="text"
      className={classNames(
        classNameInput,
        "form-control block w-full  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none",
        {
          "px-2 py-1 text-sm": size === "sm",
          "px-4 py-2 text-xl": size === "lg",
          "pl-8": icon?.position === "start",
          "pr-8": icon?.position === "end",
        }
      )}
      style={styleInput}
      id={id}
      placeholder={placeholder}
      {...input}
    />
  );
};

export default TextFieldCore;
