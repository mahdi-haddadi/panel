import classNames from "classnames";
import { memo } from "react";
import useWindowScroll from "../../hooks/useWindowScroll";
import ActionsBox from "./components/ActionsBox";
import SearchBox from "./components/SearchBox";

const Header = () => {
  const { scrollY } = useWindowScroll();

  return (
    <header
      className={classNames(
        "transition-all flex justify-between items-center sticky left-0 top-0 px-4 z-20",
        {
          "bg-bg-paper shadow-lg mx-auto": scrollY > 50,
        }
      )}
    >
      <SearchBox />
      <ActionsBox />
    </header>
  );
};

export default memo(Header);
