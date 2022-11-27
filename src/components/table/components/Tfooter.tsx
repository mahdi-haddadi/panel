import { useContext, useMemo } from "react";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Translator from "../../../i18n/Translator";
import Button from "../../button/Button";
import Menu from "../../menu/Menu";
import MenuCore from "../../menu/MenuCore";
import MenuItem from "../../menu/MenuItem";
import { TableContext } from "../context/TableContext";
const Tfooter = () => {
  const {
    data,
    tableSelected,
    nextPage,
    prevPage,
    setShowItemsPage,
    showItemsPage,
    lastPageData,
    firstPageData,
  } = useContext(TableContext);

  const showItemsPageList = useMemo(
    () => [
      {
        id: 1,
        content: 10,
        active: true,
        set: () => setShowItemsPage(10),
      },
      {
        id: 2,
        content: 25,
        set: () => setShowItemsPage(25),
      },
      {
        id: 3,
        content: 50,
        set: () => setShowItemsPage(50),
      },
    ],
    [setShowItemsPage]
  );

  return (
    <div className="footer-table p-4 flex justify-between items-center border-t-2 bg-bg-default">
      <div>
        {tableSelected.length > 0 && (
          <p>
            {tableSelected.length} <Translator>row-selected</Translator>
          </p>
        )}
      </div>
      <div className="toolbar-footer-table flex items-center">
        <p className="text-text-primary">
          <Translator>row-per-page</Translator> :{" "}
        </p>
        <MenuCore>
          <Button
            // color="info"
            className="px-2 mx-2 text-center flex items-center border-2 border-gray-500 bg-gray-500 hover:bg-gray-500 activr:bg-gray-500 focus:bg-gray-500"
          >
            <div className="mr-3">{showItemsPage}</div>
            <BsChevronDown />
          </Button>
          <Menu id="table-list-item" className="translate-x-0 translate-y-0">
            {showItemsPageList.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  active={showItemsPage === item.content}
                  onClick={item.set}
                >
                  {item.content}
                </MenuItem>
              );
            })}
          </Menu>
        </MenuCore>
        <p className="text-text-primary">
          {firstPageData + 1} - {lastPageData} of {data?.length}
        </p>
        <div className="flex items-center mx-4">
          <span
            className="mx-2 cursor-pointer text-text-primary"
            onClick={prevPage}
          >
            <BsChevronLeft />
          </span>
          <span
            className="mx-2 cursor-pointer text-text-primary"
            onClick={nextPage}
          >
            <BsChevronRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tfooter;
