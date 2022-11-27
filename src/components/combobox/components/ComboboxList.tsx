import { ReactNode, useRef } from "react";
import useOnClickOutside from "../../../hooks/useClickOutSide";

interface Props {
  children: ReactNode;
  activeCombobox?: any;
  closeCombobox?: any;
}
const ComboboxList = ({ children, activeCombobox, closeCombobox }: Props) => {
  const refCloseCombobox = useRef(null);
  useOnClickOutside(refCloseCombobox, closeCombobox);
  return (
    activeCombobox && (
      <div ref={refCloseCombobox} className="combobox-list relative
      ">
        {children}
      </div>
    )
  );
};

export default ComboboxList;
