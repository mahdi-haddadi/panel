import { useContext, useRef } from "react";
import classNames from "classnames";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import useClickOutSide from "../../hooks/useClickOutSide";
import Portal from "../../utils/Portal";
import { SidebarContext } from "./context/SidebarContext";
import HeadSidebar from "./components/HeadSidebar";
import ListItems from "./components/ListItems";
import { sidebarData } from "./../../data/sidebar";
import "./assets/sidebar.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomScroll from "../scrollbar/CustomScroll";
const Sidebar = () => {
  const { language } = useSelector((state: RootState) => state.config);
  const { closeSidebar, isOpenSidebar } = useContext(SidebarContext);

  const { width } = useWindowDimensions();
  const refSidebar = useRef<null | HTMLDivElement>(null);
  const refSidebarTest = useRef(null);
  useClickOutSide(refSidebarTest, closeSidebar);

  const handleMouseEnter = () => {
    if (!isOpenSidebar) {
      refSidebar.current?.classList.add("is-hover");
      refSidebar.current?.classList.remove("is-close");
    }
  };

  const handleMouseLeave = () => {
    if (!isOpenSidebar) {
      refSidebar.current?.classList.add("is-close");
      refSidebar.current?.classList.remove("is-hover");
    }
  };
  return width > 768 ? (
    <div
      ref={refSidebar}
      className={classNames(
        "sidebar h-screen inline-block bg-bg-default fixed z-40 transition-all select-none",
        { "is-open": isOpenSidebar, "is-close": !isOpenSidebar }
      )}
      style={{ width: `${isOpenSidebar ? "250px" : "80px"}` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CustomScroll>
        <HeadSidebar />
        <div className="list">
          {sidebarData.map((c) => {
            return (
              <div key={c.id} className="list-item pt-5">
                <div className="relative">
                  <span
                    className={classNames(
                      "list-category text-sm text-text-primary px-5 ml-2 transition-all"
                    )}
                  >
                    {language === "fa" ? c.category_fa : c.category_en}
                  </span>
                  <span
                    className={classNames(
                      "line-category absolute w-4 h-0.5 bg-slate-700 left-0 rtl:right-0 top-1/2",
                      {
                        hidden:
                          c.id === 1 &&
                          refSidebar.current?.classList.contains("is-close"),
                      }
                    )}
                  />
                </div>
                <ul>
                  {c.items.map((i) => {
                    return <ListItems item={i} key={i.id} />;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </CustomScroll>
    </div>
  ) : (
    <Portal className="w-full h-full">
      {isOpenSidebar && (
        <div className="fixed w-full h-screen bg-black/30 -z-10 backdrop-blur-3xl" />
      )}
      <div
        ref={refSidebarTest}
        className={classNames(
          "sidebar h-screen overflow-y-auto overflow-x-hidden inline-block bg-bg-default fixed z-50 transition-all select-none w-64",
          { "left-0": isOpenSidebar, "-left-full": !isOpenSidebar }
        )}
      >
        <CustomScroll>
          <HeadSidebar />
          <div className="list">
            {sidebarData.map((c) => {
              return (
                <div key={c.id} className="my-5">
                  <div className="relative">
                    <span
                      className={classNames(
                        "text-sm text-gray-400 px-5 ml-2 transition-all"
                      )}
                    >
                      {language === "fa" ? c.category_fa : c.category_en}
                    </span>
                    <span
                      className={classNames(
                        "absolute w-4 h-0.5 bg-slate-700 left-0 top-1/2"
                      )}
                    />
                  </div>
                  <ul>
                    {c.items.map((i) => {
                      return <ListItems item={i} key={i.id} />;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </CustomScroll>
      </div>
    </Portal>
  );
};

export default Sidebar;
