import classNames from "classnames";
import { FC, useMemo } from "react";
import { IIcon, IInput } from "../type";

const InputBase: FC<IInput> = ({
  className,
  fullWidth = false,
  label,
  helperText,
  icon,
  size = "md",
  color = "transparent",
  multiline,
  id,
  initialValue,
  onChange,
  onFocus,
  onBlur,
  ...input
}) => {
  const colorInput = useMemo(
    () => ({
      primary: "bg-blue-600",
      secondary: "bg-purple-600",
      success: "bg-green-500",
      danger: "bg-red-600",
      warning: "bg-yellow-500",
      info: "bg-blue-400",
      light: "bg-gray-200",
      dark: "bg-gray-800",
      transparent: "bg-transparent",
    }),
    []
  );
  return (
    <div className="input-core">
      {label && (
        <label htmlFor={id} className={label.className} style={label.style}>
          {label.content}
        </label>
      )}
      <div className="relative">
        <input
          {...input}
          value={initialValue && initialValue}
          onChange={onChange && onChange}
          onFocus={onFocus && onFocus}
          onBlur={onBlur && onBlur}
          id={id}
          className={classNames(
            color && colorInput[color],
            className,
            "block px-3 py-1.5 font-normal text-text-primary placeholder:text-text-primary shadow-2xl rounded-xl bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:outline-none",
            {
              "w-full": fullWidth,
              "px-2 py-1 text-sm": size === "sm",
              "px-4 py-2 text-xl": size === "lg",
              "pl-8":
                icon &&
                icon.length > 0 &&
                icon.map((i) => i.position === "start"),
              "pr-8":
                icon &&
                icon.length > 0 &&
                icon.map((i) => i.position === "end"),
            }
          )}
        />
        {icon &&
          icon.length > 0 &&
          icon.map((i: IIcon, index) => {
            return (
              <div
                key={index}
                onClick={i.onClick}
                className={classNames(
                  i.className,
                  "absolute top-1/2 -translate-y-1/2",
                  {
                    "left-1": i.position === "start",
                    "right-1": i.position === "end",
                  }
                )}
                style={i.style}
              >
                {i.icon}
              </div>
            );
          })}
      </div>
      {helperText && (
        <p className={helperText.className} style={helperText.style}>
          {helperText.content}
        </p>
      )}
    </div>
  );
};

export default InputBase;
