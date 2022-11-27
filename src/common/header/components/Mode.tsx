import { Fragment } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button/Button";
import Menu from "../../../components/menu/Menu";
import MenuCore from "../../../components/menu/MenuCore";
import MenuItem from "../../../components/menu/MenuItem";
import Translator from "../../../i18n/Translator";
import { setTheme } from "../../../redux/features/config/configSlice";
import { RootState } from "../../../redux/store";
import { setLocal } from "../../../utils/storage";

const Mode = () => {
  const { theme } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();
  const data = [
    {
      id: 1,
      content: <Translator>default</Translator>,
      active: theme === "default",
      disabled: false,
      set: () => {
        dispatch(setTheme("default"));
        setLocal("theme", "default");
      },
    },
    {
      id: 2,
      content: <Translator>default-dark</Translator>,
      active: theme === "darkDefault",
      disabled: false,
      set: () => {
        dispatch(setTheme("darkDefault"));
        setLocal("theme", "darkDefault");
      },
    },
  ];
  return (
    <Fragment>
      <MenuCore>
        <Button color="link" className="mx-2 cursor-pointer" rounded={true}>
          <BsFillMoonStarsFill size={"1.4rem"} color={"#626477"} />
        </Button>
        <Menu id="mode">
          {data.map((i) => {
            return (
              <MenuItem
                key={i.id}
                active={i.active}
                disabled={i.disabled}
                onClick={() => i.set()}
              >
                {i.content}
              </MenuItem>
            );
          })}
        </Menu>
      </MenuCore>
    </Fragment>
  );
};

export default Mode;
