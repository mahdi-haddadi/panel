import { createContext, ReactNode } from "react";
import { IContextValues } from "../types";

interface Props {
  children: ReactNode;
  values: IContextValues;
}
const vd = () => {};
export const TableContext = createContext({
  currentSort: "DEFAULT",
  setCurrentSort: vd,
  keySort: "",
  setKeySort: vd,
  filteredData: [],
  setFilteredData: vd,
  tableSelected: [],
  setTableSelected: vd,
  data: [],
  currentPage: 1,
  nextPage: vd,
  pageNumbers: [],
  pages: 1,
  paginate: vd,
  prevPage: vd,
  setSearching: vd,
  sliceData: [],
  setShowItemsPage: vd,
  showItemsPage: 10,
  checkbox: false,
  actions: undefined,
  firstPageData: 1,
  lastPageData: 1,
} as IContextValues);

const TableProvider = ({ values, children }: Props) => {
  return (
    <TableContext.Provider value={values}>{children}</TableContext.Provider>
  );
};
export default TableProvider;
