import {
  FC,
  useContext,
  useEffect,
  useCallback,
  useState,
  Fragment,
  Dispatch,
  SetStateAction,
} from "react";
import { AiOutlineLine } from "react-icons/ai";
import { BsGripVertical } from "react-icons/bs";
import useToggle from "../../../hooks/useToggle";
import Checkbox, {
  InputCheckbox,
  LabelCheckbox,
} from "../../checkbox/Checkbox";
import Menu from "../../menu/Menu";
import MenuCore from "../../menu/MenuCore";
import MenuItem from "../../menu/MenuItem";
import MenuToggle from "../../menu/MenuToggle";
import { TableContext } from "../context/TableContext";
import Dialog from "./../../Dialog/Dialog";
import { IActions,ISort, IColumns } from "../types";
import Button from "../../button/Button";
import Switch from "../../switch/Switch";
interface Props {
  columns: IColumns[];
  handleSort: () => void;
  sortTypes: any;
  setShowColumns: (key: string) => void;
  currentSort:ISort,
  setKeySort:Dispatch<SetStateAction<string>>
}
const Thead: FC<Props> = ({
  columns,
  handleSort,
  sortTypes,
  setShowColumns,
  currentSort,
  setKeySort,
}) => {
  const { close, open, state: isShowDialogFilterColumns } = useToggle();
  const {
    data,
    setTableSelected,
    tableSelected,
    checkbox,
    actions,
    filterColumns,
    setFilterColumns,
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

  // const handleHideColumn = useCallback(
  //   (key: string) => {
  //     const filter = filterColumns.filter((i) => i.key !== key);
  //     setFilterColumns(filter);
  //   },
  //   [filterColumns, setFilterColumns]
  // );
  return (
    <Fragment>
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
            filterColumns.map((c: any) => {
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
                      <MenuCore>
                        <MenuToggle>
                          <span className="cursor-pointer text-text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            <BsGripVertical />
                          </span>
                        </MenuToggle>
                        <Menu>
                          <MenuItem>
                            Hide
                          </MenuItem>
                          <MenuItem onClick={open}>Show Columns</MenuItem>
                        </Menu>
                      </MenuCore>
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
                      <MenuCore>
                        <MenuToggle>
                          <span className="cursor-pointer text-text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            <BsGripVertical />
                          </span>
                        </MenuToggle>
                        <Menu>
                          <MenuItem>Hide</MenuItem>
                          <MenuItem>Show Columns</MenuItem>
                        </Menu>
                      </MenuCore>
                    </div>
                  </div>
                </th>
              );
            })}
        </tr>
      </thead>
      <Dialog
        open={isShowDialogFilterColumns}
        IsClose={close}
        size="xs"
        backLayer={false}
        freeze={true}
      >
        <Dialog.Body>
          <div>
            {filterColumns.length &&
              filterColumns.map((i) => {
                return (
                  <div className="flex my-2 px-4" key={i.key}>
                    <Checkbox
                      checked={true}
                      setChecked={() => setShowColumns(i.key)}
                    >
                      <Switch className="mx-2" />
                      <LabelCheckbox>{i.key}</LabelCheckbox>
                    </Checkbox>
                  </div>
                );
              })}
          </div>
        </Dialog.Body>
        <Dialog.Footer>
          <div className="flex justify-between">
            <Button color="danger-outline">Hide All</Button>
            <Button color="danger-outline">Show All</Button>
          </div>
        </Dialog.Footer>
      </Dialog>
    </Fragment>
  );
};

export default Thead;
