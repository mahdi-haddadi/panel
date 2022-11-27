import { Children, cloneElement, FC, ReactNode } from "react";
import useToggle from "../../hooks/useToggle";
import CSS from "csstype";
import classNames from "classnames";
interface Props {
  children: ReactNode;
  className?: string;
  style?: CSS.Properties;
}
const Popover: FC<Props> = ({ className, style, children }) => {
  const {
    state: activePopover,
    close: closePopover,
    open: openPopover,
    toggle: togglePopover,
  } = useToggle();
  const childNode = Children.map(children, (child: any) => {
    const clone = cloneElement(child, {
      activePopover,
      closePopover,
      openPopover,
      togglePopover,
    });
    return clone;
  });
  return (
    <div style={style} className={classNames(className, "relative")}>
      {childNode}
    </div>
  );
};

export default Popover;
