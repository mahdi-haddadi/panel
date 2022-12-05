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
  tableSelected: number[];
  setTableSelected: Dispatch<SetStateAction<number[]>>;
  data: Object[];
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
  filterColumns: IColumns[] | [];
  setFilterColumns: Dispatch<SetStateAction<IColumns[]>>;
}
