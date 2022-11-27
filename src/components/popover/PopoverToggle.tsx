import { FC } from "react";
interface Props {
  children: JSX.Element | JSX.Element[];
  togglePopover?: any;
  positionToggle?: any;
}
const PopoverToggle: FC<Props> = ({
  children,
  togglePopover,
}) => {
  return (
    <div className="toggle-popover" onClick={togglePopover}>
      {children}
    </div>
  );
};

export default PopoverToggle;
