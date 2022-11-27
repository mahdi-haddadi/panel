import classNames from "classnames";
import React, { FC, useMemo, useRef, useState } from "react";
import {  IIcon, IInput } from "../type";

const InputStandard: FC<IInput> = ({
  className,
  fullWidth = false,
  label,
  helperText,
  icon,
  size = "md",
  color = "transparent",
  multiline,
  id,
  ...input
}) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef<null | HTMLInputElement>(null);
  const colorInput = useMemo(
    () => ({
      primary: "blue-500",
      secondary: "purple-600",
      success: "green-500",
      danger: "red-600",
      warning: "yellow-500",
      info: "blue-400",
      light: "gray-200",
      dark: "gray-800",
      transparent: "bg-transparent",
    }),
    []
  );
  const _colorInput = useMemo(
    () => color && colorInput[color],
    [color, colorInput]
  );

  return (
    <div className="input-core inline-block group">
      {label && (
        <label htmlFor={id} className={label.className} style={label.style}>
          {label.content}
        </label>
      )}
      <div className="relative">
        <input
          {...input}
          ref={ref}
          id={id}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={classNames(
            className,
            "px-3 py-3 text-base font-normal text-gray-700 bg-transparent bg-clip-padding transition ease-in-out m-0 focus:text-gray-700 focus:outline-none relative ",
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
        <span
          className={classNames(
            `absolute w-full h-0.5
                left-0 bottom-0 transition-all group-hover:h-1 bg-slate-300 after:transition-all after:h-full  after:absolute after:left-1/2 after:bottom-0  after:z-50 after:bg-${_colorInput}  before:transition-all before:h-full before:origin-right before:absolute before:left-1/2 before:bottom-0  before:z-50 before:bg-${_colorInput}`,
            {
              "h-1 after:w-1/2 before:w-1/2": focused,
              "h-0.5 after:w-0 before:w-0": !focused,
            }
          )}
        />
        {icon &&
          icon.length > 0 &&
          icon.map((i: IIcon) => {
            return (
              <div
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

export default InputStandard;
