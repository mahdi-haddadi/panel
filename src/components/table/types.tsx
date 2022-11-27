import { Dispatch, SetStateAction } from "react";

export type ISort = "DEFAULT" | "DOWN" | "UP";
export interface IColumns {
  key: string;
  title: string | JSX.Element | null;
}
export interface ISortTypes {
  up: {
    icon: JSX.Element;
    fn: (key: string) => void;
  };
  down: {
    icon: JSX.Element;
    fn: (key: string) => void;
  };
  default: {
    icon: JSX.Element;
    fn: () => void;
  };
}
export interface IActions {
  key: String;
  title: String | JSX.Element;
  content: any;
}
export interface IContextValues {
  currentSort: ISort;
  setCurrentSort: Dispatch<SetStateAction<ISort>>;
  keySort: string;
  setKeySort: Dispatch<SetStateAction<string>>;
  filteredData: Object[];
  setFilteredData: Dispatch<SetStateAction<Object[]>>;
  tableSelected: number[];
  setTableSelected: Dispatch<SetStateAction<number[]>>;
  data: Object[];
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  pageNumbers: Object[];
  pages: number;
  paginate: (pageNumber: number) => void;
  setSearching: Dispatch<SetStateAction<boolean>>;
  sliceData: Object[];
  setShowItemsPage: Dispatch<SetStateAction<number>>;
  showItemsPage: number;
  checkbox: boolean | undefined;
  actions: IActions[] | undefined;
  firstPageData: number;
  lastPageData: number;
}
