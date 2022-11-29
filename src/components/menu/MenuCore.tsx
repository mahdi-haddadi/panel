import {
  Children,
  cloneElement,
  FC,
  Fragment,
  MouseEvent,
  ReactNode,
  useState,
  FunctionComponentElement,
} from "react";
import { ICloneElement } from "./types";
interface Props {
  children: ReactNode | JSX.Element;
}
const MenuCore: FC<Props> = ({ children }) => {
  const [el, setEl] = useState<null | HTMLElement>(null);
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setEl(e.currentTarget);
  };
  const childNode = Children.map(children, (child: any) => {
    if (
      child.type.name === "Button" ||
      child.type.name === "Menu" ||
      child.type.name === "MenuToggle"
    ) {
      const clone: FunctionComponentElement<ICloneElement> = cloneElement(
        child,
        {
          element: el,
          onClose: () => setEl(null),
          handleClick,
          open: !!el,
          setEl,
        }
      );
      return clone;
    }
    return child;
  });
  return <Fragment>{childNode}</Fragment>;
};

export default MenuCore;
