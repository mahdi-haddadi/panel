import classNames from "classnames";
import { FC, ReactNode } from "react";
interface Props {
  onClose?: () => void;
  className?: string;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onCloseMenu?: () => void;
}
const MenuItem: FC<Props> = ({
  onClose,
  className,
  children,
  active,
  disabled,
  onClick,
  onCloseMenu,
}) => {
  return (
    <li
      onClick={() => {
        onClose && onClose();
        onClick && onClick();
        onCloseMenu && onCloseMenu();
      }}
      className={classNames(
        className,
        "px-4 py-1 border-b border-gray-200 w-full rounded-lg select-none cursor-pointer",
        {
          "bg-blue-600 text-white": active,
          "text-gray-400 cursor-default": disabled,
          "hover:bg-gray-100 hover:text-gray-500 transition duration-500 cursor-pointer":
            !disabled && !active,
        }
      )}
    >
      {children}
    </li>
  );
};

export default MenuItem;
