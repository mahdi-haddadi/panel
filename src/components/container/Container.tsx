import { FC, ReactNode, useContext } from "react";
import Header from "../../common/header/Header";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import {
  IContextValues,
  SidebarContext,
} from "../sidebar/context/SidebarContext";
interface Props {
  children: ReactNode;
}
const Container: FC<Props> = ({ children }) => {
  const { isOpenSidebar } = useContext(SidebarContext) as IContextValues;
  const { width } = useWindowDimensions();
  return (
    <div
      className="inline-block ltr:float-right rtl:float-left px-10"
      style={{
        width: `${
          width > 768
            ? isOpenSidebar
              ? "calc(100% - 250px)"
              : "calc(100% - 80px)"
            : "100%"
        }`,
      }}
    >
      <Header />
      {children}
    </div>
  );
};

export default Container;
