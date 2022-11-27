import classNames from "classnames";
import CSS from "csstype";
import { Children, cloneElement, FC, ReactNode } from "react";
import useToggle from "../../hooks/useToggle";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSS.Properties;
}
const Combobox: FC<Props> = ({ children, className, style }) => {
  const {
    close: closeCombobox,
    open: openCombobox,
    state: activeCombobox,
    toggle: toggleCombobox,
  } = useToggle();

  const childNode = Children.map(children, (child: any) => {
    const clone = cloneElement(child, {
      closeCombobox,
      openCombobox,
      activeCombobox,
      toggleCombobox,
    });
    return clone;
  });
  return (
    <div className={classNames(className, "combobox relative")} style={style}>
      {childNode}
    </div>
  );
};

export default Combobox;
