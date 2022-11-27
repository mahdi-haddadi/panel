import classNames from "classnames";
import { Fragment, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";
import { RootState } from "../../../redux/store";

const ListItems = ({ item }: any) => {
  const { language } = useSelector((state: RootState) => state.config);
  const { state: subIsOpen, toggle: setSubOpen, close: subClose } = useToggle();

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarCloseing = sidebar?.classList.contains("is-close");

    const sidebarOpening =
      sidebar?.classList.contains("is-hover") ||
      sidebar?.classList.contains("is-open");
    if (sidebarCloseing && !sidebarOpening) {
      subClose();
    }
  }, [subClose]);

  return (
    <li
      key={item.id}
      className="item cursor-pointer mx-1 transition-all block"
      onClick={setSubOpen}
    >
      {item.sub ? (
        <Fragment>
          {
            <div
              className={classNames(
                "text-slate-400 group flex justify-start items-center hover:bg-slate-500 px-4 py-3 rounded-lg relative",
                { "bg-bg-paper": subIsOpen }
              )}
            >
              <span
                className={classNames(
                  "icon-item-list text-text-secondary group-hover:text-white mx-2",
                  { "text-white": setSubOpen }
                )}
              >
                {item.icon}
              </span>
              <span
                className={classNames(
                  "title-item-list ml-3 text-text-secondary transition-all group-hover:text-white",
                  { "text-white": subIsOpen }
                )}
              >
                {language === "fa" ? item.title_fa : item.title_en}
              </span>

              <span
                className={classNames(
                  "arrow-sub-list text-white absolute ltr:right-1 rtl:left-1 top-1/2 -translate-y-1/2 z-50 transition-all ",
                  {
                    "rotate-90": subIsOpen,
                    "rtl:rotate-180": !subIsOpen,
                  }
                )}
              >
                <AiOutlineRight />
              </span>
            </div>
          }
        </Fragment>
      ) : (
        <Link to={item.to ? item.to : "/"}>
          <div className="group flex justify-start items-center hover:bg-slate-500 px-4 py-3 rounded-lg relative">
            <span
              className={classNames(
                "icon-item-list text-text-secondary group-hover:text-white mx-2"
              )}
            >
              {item.icon}
            </span>
            <span
              className={classNames(
                "title-item-list ml-3 text-text-secondary transition-all group-hover:text-white"
              )}
            >
              {language === "fa" ? item.title_fa : item.title_en}
            </span>
          </div>
        </Link>
      )}
      {item.sub && (
        <div
          className={classNames("sub-list min-h-0 transition-all", {
            "h-auto moz": subIsOpen,
            "h-0 test": !subIsOpen,
          })}
        >
          <ul className="mx-3">
            {item.sub.map((i: any) => {
              return (
                <li key={i.id}>
                  <Link to={i.to}>
                    <div className="group hover:bg-slate-700 rounded-lg transition-all py-3">
                      <span className="text-slate-400 group-hover:text-white px-3">
                        {language === "fa" ? i.title_fa : i.title_en}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
};

export default ListItems;
