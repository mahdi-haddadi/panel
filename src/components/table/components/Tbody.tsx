import { FC, useCallback, useContext } from "react";
import { InputCheckbox } from "../../checkbox/Checkbox";
import { TableContext } from "../context/TableContext";
import { IActions, IColumnsFilter } from "../types";

interface Props {
  data: Object[];
  columns: Object[];
}
const Tbody: FC<Props> = ({ data, columns }) => {
  const {
    setTableSelected,
    tableSelected,
    sliceData,
    checkbox,
    actions,
    filterColumns,
  } = useContext(TableContext);

  const handleIsChecked = useCallback(
    (id: number): boolean => {
      if (tableSelected.some((i) => i === id)) return true;
      return false;
    },
    [tableSelected]
  );

  const handleSelectItem = useCallback(
    (id: number) => {
      if (tableSelected.some((i) => i === id)) {
        let copyDataSelectData = [...tableSelected];
        copyDataSelectData = copyDataSelectData.filter((i: any) => i !== id);
        setTableSelected([...copyDataSelectData]);
      } else {
        let copyDataSelectData = [...tableSelected];
        copyDataSelectData.push(id);
        setTableSelected([...copyDataSelectData]);
      }
    },
    [setTableSelected, tableSelected]
  );
  return (
    <tbody>
      {data &&
        sliceData.length > 0 &&
        sliceData.map((i: any, index) => {
          return (
            <tr
              className="border-b border-b-slate-100 bg-bg-paper hover:bg-bg-default transition-colors"
              key={index}
            >
              {checkbox && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                  <InputCheckbox
                    checked={handleIsChecked(i.id)}
                    onClick={() => handleSelectItem(i.id)}
                  />
                </td>
              )}
              {filterColumns.map((c: IColumnsFilter, index) => {
                return (
                  c.isShow && (
                    <td
                      key={index}
                      className="text-sm ltr:text-left rtl:text-right text-text-primary font-light px-2 py-4 whitespace-nowrap"
                    >
                      {c?.differentShow ? c?.differentShow(i) : i[c?.key]}
                    </td>
                  )
                );
              })}
              {actions &&
                actions.length > 0 &&
                actions.map((a: IActions, index) => {
                  return <td key={index}>{a.content(i.id)}</td>;
                })}
            </tr>
          );
        })}
    </tbody>
  );
};

export default Tbody;
