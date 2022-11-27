import { createContext, ReactNode } from "react";
export interface IContextValues {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}
interface Props {
  values: IContextValues;
  children: ReactNode;
}
const vd = () => {};
export const SidebarContext = createContext({
  isOpenSidebar: false,
  toggleSidebar: vd,
  closeSidebar: vd,
  openSidebar: vd,
} as IContextValues);

export const SidebarProvider = ({ values, children }: Props) => {
  return (
    <SidebarContext.Provider value={values}>{children}</SidebarContext.Provider>
  );
};
