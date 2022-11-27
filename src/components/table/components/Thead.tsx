import { FC, useContext, useEffect, useState } from "react";
import { AiOutlineLine } from "react-icons/ai";
import { BsGripVertical } from "react-icons/bs";
import { InputCheckbox } from "../../checkbox/Checkbox";
import { TableContext } from "../context/TableContext";
import { IActions, IColumns } from "../types";
interface Props {
  columns: IColumns[];
  handleSort: () => void;
  sortTypes: any;
}
const Thead: FC<Props> = ({ columns, handleSort, sortTypes }) => {
  const {
    currentSort,
    setKeySort,
    data,
    setTableSelected,
    tableSelected,
    checkbox,
    actions,
  } = useContext(TableContext);

  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    if (data && data.length > 0) {
      if (selectAll) {
        const ids = data.map((i: any) => i?.id);
        setTableSelected([...ids]);
      } else {
        setTableSelected([]);
      }
    }
  }, [data, selectAll, setTableSelected]);
  return (
    <thead className="border-b bg-bg-default select-none">
      <tr>
        {checkbox && (
          <th scope="col" className="w-10 px-6 py-4">
            {tableSelected.length < data.length ? (
              <InputCheckbox
                checked={
                  tableSelected.length < data.length &&
                  tableSelected.length !== 0
                }
                setChecked={setSelectAll}
                component={<AiOutlineLine color="#fff" />}
              />
            ) : (
              <InputCheckbox
                checked={tableSelected.length === data.length}
                setChecked={setSelectAll}
              />
            )}
          </th>
        )}
        {columns &&
          columns.length > 0 &&
          columns.map((c: any) => {
            return (
              <th
                key={c.key}
                scope="col"
                className="text-sm text-text-primary font-medium pl-2 py-4 text-left group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>{c.title}</span>
                    <span
                      className="mx-3 text-text-primary cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        handleSort();
                        setKeySort(c?.key);
                      }}
                    >
                      {sortTypes[currentSort.toLowerCase()].icon}
                    </span>
                  </div>
                  <div>
                    <span className="cursor-pointer text-text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <BsGripVertical />
                    </span>
                  </div>
                </div>
              </th>
            );
          })}
        {actions &&
          actions.length > 0 &&
          actions.map((a: IActions, index) => {
            return (
              <th
                key={index}
                scope="col"
                className="text-sm text-text-primary font-medium pl-2 py-4 text-left group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>{a.title}</span>
                  </div>
                  <div>
                    <span className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <BsGripVertical />
                    </span>
                  </div>
                </div>
              </th>
            );
          })}
      </tr>
    </thead>
  );
};

export default Thead;
