import { Fragment } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button/Button";
import Menu from "../../../components/menu/Menu";
import MenuCore from "../../../components/menu/MenuCore";
import MenuItem from "../../../components/menu/MenuItem";
import Translator from "../../../i18n/Translator";
import { setLanguage } from "../../../redux/features/config/configSlice";
import { RootState } from "../../../redux/store";
import { setLocal } from "../../../utils/storage";
const ChangeLanguage = () => {
  const { language } = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();

  const data = [
    {
      id: 1,
      content: <Translator>english</Translator>,
      active: language === "en",
      set: () => {
        setLocal("lang", "en");
        dispatch(setLanguage("en"));
      },
    },
    {
      id: 2,
      content: <Translator>persion</Translator>,
      active: language === "fa",
      set: () => {
        setLocal("lang", "fa");
        dispatch(setLanguage("fa"));
      },
    },
  ];
  return (
    <Fragment>
      <MenuCore>
        <Button color="link" className="mx-2 cursor-pointer" rounded={true}>
          <AiOutlineGlobal size={"1.4rem"} color={"#626477"} />
        </Button>
        <Menu id="change-language">
          {data.map((i) => {
            return (
              <MenuItem key={i.id} active={i.active} onClick={() => i.set()}>
                {i.content}
              </MenuItem>
            );
          })}
        </Menu>
      </MenuCore>
    </Fragment>
  );
};

export default ChangeLanguage;
