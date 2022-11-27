import classNames from "classnames";
import { Fragment, useContext } from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
const HeadSidebar = () => {
  const { isOpenSidebar, toggleSidebar } = useContext(SidebarContext);
  return (
    <Fragment>
      <div className="head py-5 flex justify-between px-6">
        <Link to={"/"}>
          <div className="w-10 h-10">
            <img
              src="./images/logo.png"
              alt="logo"
              className="mx-auto w-full h-full"
            />
          </div>
        </Link>
        <button
          onClick={toggleSidebar}
          className={classNames("btn-toggle-sidebar transition-transform", {
            // "rotate-180": isOpenSidebar,
            "rotate-180": !isOpenSidebar,
          })}
        >
          <AiOutlineDoubleRight color="var(--color-text-primary)" />
        </button>
      </div>
      <hr style={{ background: "var(--color-text-primary)" }} />
    </Fragment>
  );
};

export default HeadSidebar;
