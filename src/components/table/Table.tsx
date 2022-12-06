import {
  ChangeEvent,
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  BsFillCaretDownFill,
  BsFillCaretUpFill,
  BsFillDiamondFill,
} from "react-icons/bs";
import useDebounce from "../../hooks/useDebounce";
import usePagination from "../../hooks/usePagination";
import Loading from "../loading/Loading";
import Tbody from "./components/Tbody";
import Tfooter from "./components/Tfooter";
import Thead from "./components/Thead";
import Theader from "./components/Theader";
import TableProvider from "./context/TableContext";
import { IActions, IColumns, IColumnsFilter, ISort } from "./types";

interface Props {
  columns: IColumns[];
  data: Object[];
  tableSelected: number[];
  setTableSelected: Dispatch<SetStateAction<number[]>>;
  checkbox?: boolean;
  loading?: boolean;
  actions?: IActions[];
  error?: any;
  id?: string;
  keySearch?: string | string[];
}

const Table: FC<Props> = ({
  columns,
  data,
  tableSelected,
  setTableSelected,
  checkbox,
  loading,
  actions,
  error,
  id,
  keySearch,
}) => {
  const [currentSort, setCurrentSort] = useState<ISort>("DEFAULT");
  const [keySort, setKeySort] = useState("");
  const [search, setSearch] = useState("");
  const [filterColumns, setFilterColumns] = useState<IColumnsFilter[] | []>([]);

  useEffect(() => {
    setFilterColumns(columns.map((col) => ({ ...col, isShow: true })));
  }, [columns]);

  const _search = useDebounce(search, 500);

  const {
    filteredData,
    setFilteredData,
    currentPage,
    nextPage,
    pageNumbers,
    pages,
    paginate,
    prevPage,
    setSearching,
    sliceData,
    setShowItemsPage,
    showItemsPage,
    firstPageData,
    lastPageData,
  } = usePagination(data);

  useEffect(() => {
    if (typeof keySearch === "string") {
      if (_search.length > 0) {
        const filterBySearchData = data.filter((i: any) =>
          i[keySearch].includes(_search)
        );
        setFilteredData(filterBySearchData);
      } else {
        setFilteredData(data);
      }
    } else if (keySearch?.length) {
      // bug in keySearchs
      if (_search.length > 0) {
        keySearch.forEach((key: string) => {
          const filterBySearchData = data.filter((i: any) =>
            i[key].includes(_search)
          );
          setFilteredData(filterBySearchData);
        });
      } else {
        setFilteredData(data);
      }
    }
  }, [data, setFilteredData, keySearch, _search]);

  const sortUp = useCallback(
    (key: string) => {
      const copyData = [...data];
      const sortData = copyData.sort((a: any, b: any) =>
        typeof a[key] === "string" && typeof b[key] === "string"
          ? a[key].localeCompare(b[key])
          : a[key] - b[key]
      );
      setFilteredData(sortData);
    },
    [data, setFilteredData]
  );

  const sortDown = useCallback(
    (key: string) => {
      const copyData = [...data];
      const reverseData = copyData.sort((a: any, b: any) =>
        typeof a[key] === "string" && typeof b[key] === "string"
          ? b[key].localeCompare(a[key])
          : b[key] - a[key]
      );
      setFilteredData(reverseData);
    },
    [data, setFilteredData]
  );

  const sortDefault = useCallback(() => {
    setFilteredData([...data]);
  }, [data, setFilteredData]);

  const sortTypes: any = useMemo(
    () => ({
      up: {
        icon: <BsFillCaretUpFill />,
        fn: (key: string) => sortUp(key),
      },
      down: {
        icon: <BsFillCaretDownFill />,
        fn: (key: string) => sortDown(key),
      },
      default: {
        icon: <BsFillDiamondFill />,
        fn: () => sortDefault(),
      },
    }),
    [sortDefault, sortDown, sortUp]
  );

  const handleSort: () => void = useCallback(() => {
    if (currentSort === "DEFAULT") setCurrentSort("DOWN");
    else if (currentSort === "DOWN") setCurrentSort("UP");
    else if (currentSort === "UP") setCurrentSort("DEFAULT");
  }, [currentSort]);

  useEffect(() => {
    data && sortTypes[currentSort.toLowerCase()].fn(keySort);
  }, [currentSort, data, keySort, sortTypes]);
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  }, []);

  const setShowColumns = useCallback(
    (key: string) => {
      let copyData = [...filterColumns];
      copyData.forEach((col) => {
        if (col.key === key) {
          col.isShow = !col.isShow;
        }
      });
      setFilterColumns(copyData);
    },
    [filterColumns]
  );

  return (
    <Fragment>
      <TableProvider
        values={{
          tableSelected,
          setTableSelected,
          data,
          nextPage,
          pageNumbers,
          pages,
          paginate,
          prevPage,
          setSearching,
          sliceData,
          setShowItemsPage,
          showItemsPage,
          checkbox,
          actions,
          firstPageData,
          lastPageData,
          filterColumns,
          setFilterColumns,
        }}
      >
        <div className="flex flex-col bg-bg-default my-20 shadow-xl">
          <div className="overflow-x-auto rounded-2xl shadow-xl">
            <div className="inline-block min-w-full">
              <Theader tableId={id} value={search} changeValue={handleChange} />
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <Thead
                    columns={columns}
                    handleSort={handleSort}
                    sortTypes={sortTypes}
                    setShowColumns={setShowColumns}
                    currentSort={currentSort}
                    setKeySort={setKeySort}
                  />
                  {/* {
                  error && error
                } */}
                  {loading ? (
                    <tbody>
                      <tr>
                        <td>
                          <Loading />
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <Tbody data={data} columns={columns} />
                  )}
                </table>
              </div>
              <Tfooter />
            </div>
          </div>
        </div>
      </TableProvider>
    </Fragment>
  );
};

export default Table;
