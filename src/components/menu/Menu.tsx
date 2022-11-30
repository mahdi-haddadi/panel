import classNames from "classnames";
import {
  FC,
  ReactNode,
  useRef,
  useEffect,
  useCallback,
  Children,
  useState,
  cloneElement,
} from "react";
import useOnClickOutside from "../../hooks/useClickOutSide";
import { freezeScreen } from "../../utils/functions";
import Portal from "../../utils/Portal";

interface Props {
  open?: boolean;
  onClose?: () => void;
  element?: null | HTMLElement;
  id?: string;
  children: ReactNode;
  className?: string;
  setEl?: any;
  freeze?: boolean;
  position?: "top" | "bottom" | "right" | "left" | "on-bottom" | "on-top";
}
const Menu: FC<Props> = ({
  children,
  element,
  id,
  onClose,
  open,
  className,
  setEl,
  freeze = true,
  position = "bottom",
}) => {
  // const [pos, setPos] = useState()
  useEffect(() => {
    if (freeze) {
      freezeScreen(!!element);
    }
  }, [element, freeze]);

  const closeFunc = useCallback(() => {
    onClose ? onClose() : setEl(null);
  }, [onClose, setEl]);

  const refCloseMenu = useRef(null);
  useOnClickOutside(refCloseMenu, closeFunc);
  const pos = element?.getBoundingClientRect();
  // console.log((pos?.top || 0) + (pos?.height || 0));
  // console.log(window.innerHeight);

  const childNode = Children.map(children, (child: any) => {
    // pass props close menu to MenuItem
    if (child.type?.name === "MenuItem") {
      const clone = cloneElement(child, {
        onCloseMenu: onClose,
      });
      return clone;
    } else {
      return child;
    }
  });

  return open ? (
    <Portal>
      <div
        style={{
          left: `${pos?.left}px`,
          top: `${Math.round((pos?.top || 0) + (pos?.height || 0))}px`,
        }}
        data-target={id}
        ref={refCloseMenu}
        className={classNames("menu fixed z-50", className)}
      >
        <ul className="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
          {childNode}
        </ul>
      </div>
    </Portal>
  ) : null;
};

export default Menu;
