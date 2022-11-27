import classNames from "classnames";
import { FC } from "react";
import CSS from "csstype";
import TextFieldCore from "./TextFieldCore";
interface IStyle {
  className?: string;
  style?: CSS.Properties;
}

export interface IInput {
  id?: string;
  placeholder?: string;
  classNameInput?: string;
  styleInput?: CSS.Properties;
  size?: "sm" | "md" | "lg";
  icon?: {
    position: "end" | "start";
    icon: JSX.Element;
    className?: string;
    style?: CSS.Properties;
  };
}
interface IHepler extends IStyle {
  text: string | JSX.Element;
}
interface Props extends IInput {
  label?: IHepler;
  helperText?: IHepler;
}
const TextField: FC<Props> = ({
  label,
  size = "md",
  id,
  placeholder,
  classNameInput,
  styleInput,
  icon,
  helperText,
  ...input
}) => {
  return (
    <div className="mb-3 xl:w-96 relative">
      <label
        htmlFor={id}
        style={label?.style}
        className={classNames(
          label?.className,
          "form-label inline-block mb-2 text-gray-700 text-xl",
          {
            "text-xl": size === "lg",
            "text-sm": size === "sm",
          }
        )}
      >
        {label?.text}
      </label>
      <div className={classNames("relative")}>
        <TextFieldCore
          classNameInput={classNameInput}
          id={id}
          placeholder={placeholder}
          size={size}
          styleInput={styleInput}
          icon={icon}
          {...input}
        />
        {icon && (
          <div
            className={classNames(
              icon?.className,
              "absolute top-1/2 -translate-y-1/2",
              {
                "left-1": icon.position === "start",
                "right-1": icon.position === "end",
              }
            )}
            style={icon?.style}
          >
            {icon?.icon}
          </div>
        )}
      </div>
      {helperText && (
        <div
          className={classNames(
            helperText.className,
            "text-sm text-gray-500 mt-1"
          )}
          style={helperText.style}
        >
          {helperText.text}
        </div>
      )}
    </div>
  );
};

export default TextField;
