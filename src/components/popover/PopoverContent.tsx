import { Children, cloneElement, FC, useRef } from "react";
import useOnClickOutside from "../../hooks/useClickOutSide";
interface Props {
  children: JSX.Element | JSX.Element[];
  closePopover?: any;
  activePopover?: any;
}
const PopoverContent: FC<Props> = ({
  children,
  closePopover,
  activePopover,
}) => {
  const refClosePopover = useRef(null);
  useOnClickOutside(refClosePopover, closePopover);
  const childNode = Children.map(children, (child: any) => {
    const clone = cloneElement(child, {
      closePopover,
    });
    return clone;
  });
  return (
    activePopover && (
      <div className="content-popover" ref={refClosePopover}>
        {childNode}
      </div>
    )
  );
};

export default PopoverContent;
