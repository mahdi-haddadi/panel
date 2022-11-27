import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  handleClick?: () => void;
}
const MenuToggle: FC<Props> = ({ children, handleClick }) => {
  return <span onClick={handleClick}>{children}</span>;
};

export default MenuToggle;
