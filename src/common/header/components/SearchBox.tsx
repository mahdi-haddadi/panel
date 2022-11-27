import classNames from "classnames";
import { FC, Fragment, useContext, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";
import Dialog from "../../../components/Dialog/Dialog";
import InputBase from "../../../components/input/textField/components/InputBase";
import { SidebarContext } from "../../../components/sidebar/context/SidebarContext";
import useToggle from "../../../hooks/useToggle";
import Translator from "../../../i18n/Translator";

interface PropsDialogSearch {
  isClose: () => void;
  open: boolean;
}

const fakeData = [
  {
    category: "Popular Searches",
    list: [
      {
        text: "CRM",
        link: "/",
      },
      {
        text: "Analytics",
        link: "/",
      },
      {
        text: "eCommerce",
        link: "/",
      },
      {
        text: "User List",
        link: "/",
      },
    ],
  },
  {
    category: "Apps & Pages",
    list: [
      {
        text: "Calendar",
        link: "/",
      },
      {
        text: "Invoice List",
        link: "/",
      },
      {
        text: "Pricing",
        link: "/",
      },
      {
        text: "Account Settings",
        link: "/",
      },
    ],
  },
  {
    category: "User Interface",
    list: [
      {
        text: "Typography",
        link: "/",
      },
      {
        text: "Tabs",
        link: "/",
      },
      {
        text: "Buttons",
        link: "/",
      },
      {
        text: "Advanced Cards",
        link: "/",
      },
    ],
  },
  {
    category: "Forms & Tables",
    list: [
      {
        text: "Select",
        link: "/",
      },
      {
        text: "Autocomplete",
        link: "/",
      },
      {
        text: "Table",
        link: "/",
      },
      {
        text: "Date Pickers",
        link: "/",
      },
    ],
  },
];
const DialogSearch: FC<PropsDialogSearch> = ({ isClose, open }) => {
  const [searchvalue, setsearchvalue] = useState<string>("");

  return (
    <Dialog IsClose={isClose} open={open} size="sm">
      <Dialog.Header className="p-5 text-center">
        <InputBase
          style={{ color: "#fff" }}
          autoFocus={true}
          icon={[
            { icon: <AiOutlineSearch size={"1.2rem"} />, position: "start" },
            {
              icon: <BsXLg />,
              position: "end",
              className: "cursor-pointer",
              onClick: isClose,
            },
          ]}
          initialValue={searchvalue}
          onChange={(e) => setsearchvalue(e.currentTarget.value)}
        />
      </Dialog.Header>
      <Dialog.Body>
        <hr />
        {searchvalue.length > 0 ? (
          <div className={"list flex justify-center max-h-96 overflow-y-auto"}>
            <ul className="rounded-lg  w-full px-4 py-4">
              {fakeData.map((item,index) => {
                return (
                  <div key={index}>
                    <p className="text-sm text-slate-400">{item.category}</p>
                    <li
                      className={classNames(
                        "px-4 py-1 w-full rounded-t-lg select-none cursor-pointer"
                      )}
                      key={item.category}
                    >
                      {item.list.map((i) => {
                        return (
                          <p
                            key={i.text}
                            className="my-1 text-slate-300 hover:text-slate-200 cursor-pointer"
                          >
                            {i.text}
                          </p>
                        );
                      })}
                    </li>
                  </div>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-10 px-14 py-8">
            {fakeData.map((l,index) => {
              return (
                <div key={index}>
                  <p className="text-sm text-slate-400 mb-3">{l.category}</p>
                  <ul>
                    {l.list.map((i) => {
                      return (
                        <li
                          key={i.text}
                          className="my-1 text-slate-300 hover:text-slate-200 cursor-pointer"
                        >
                          {i.text}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </Dialog.Body>
    </Dialog>
  );
};

const SearchBox = () => {
  const { toggleSidebar } = useContext(SidebarContext);

  const {
    close: closeSearchDialog,
    open: openDialogSearch,
    state: stateDialogSearch,
  } = useToggle();
  return (
    <Fragment>
      <div className="search-box cursor-pointer">
        <div className="flex p-2 justify-center items-center">
          <div className="mr-4 md:hidden" onClick={toggleSidebar}>
            <AiOutlineMenu size={"1.2rem"} style={{color:'var(--color-text-primary)'}} />
          </div>
          <div
            className="flex justify-center items-center"
            onClick={openDialogSearch}
          >
            <AiOutlineSearch size={"1.3rem"} style={{color:'var(--color-text-primary)'}} />
            <span className="ml-4 text-text-primary hidden md:block">
              <Translator>search</Translator>
              {/* {`${t._("searc")}`} */}
              <sub dir="ltr"> (Ctril + /)</sub>
            </span>
          </div>
        </div>
      </div>
      {stateDialogSearch && (
        <DialogSearch isClose={closeSearchDialog} open={stateDialogSearch} />
      )}
    </Fragment>
  );
};

export default SearchBox;
