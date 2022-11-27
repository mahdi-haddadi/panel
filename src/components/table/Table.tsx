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
import usePagination from "../../hooks/usePagination";
import Loading from "../loading/Loading";
import Tbody from "./components/Tbody";
import Tfooter from "./components/Tfooter";
import Thead from "./components/Thead";
import Theader from "./components/Theader";
import TableProvider from "./context/TableContext";
import { IActions, IColumns, ISort } from "./types";

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
}) => {
  const [currentSort, setCurrentSort] = useState<ISort>("DEFAULT");
  const [keySort, setKeySort] = useState("");
  const [search, setSearch] = useState("");

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
    if (search.length > 0) {
      const filterBySearchData = data.filter((i: any) =>
        i.phone.includes(search)
      );
      setFilteredData(filterBySearchData);
    } else {
      setFilteredData(data);
    }
  }, [search, data, setFilteredData]);

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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  return (
    <Fragment>
      <TableProvider
        values={{
          currentSort,
          setCurrentSort,
          keySort,
          setKeySort,
          filteredData,
          setFilteredData,
          tableSelected,
          setTableSelected,
          data,
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
          checkbox,
          actions,
          firstPageData,
          lastPageData,
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