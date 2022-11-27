import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineFontSize } from "react-icons/ai";
import Button from "../../../components/button/Button";
import Menu from "../../../components/menu/Menu";
import MenuCore from "../../../components/menu/MenuCore";
import { setFontSize } from "../../../redux/features/config/configSlice";
import useDebounce from "../../../hooks/useDebounce";
import Slider from "../../../components/slider/Slider";

const FontSize = () => {
  const [valueFontSize, setValueFontSize] = useState(1);
  const dispatch = useDispatch();
  const value = useDebounce(valueFontSize);
  useEffect(() => {
    dispatch(setFontSize(value));
  }, [dispatch, value]);

  return (
    <Fragment>
      <MenuCore>
        <Button color="link" className="mx-2 cursor-pointer" rounded={true}>
          <AiOutlineFontSize size={"1.4rem"} color={"#626477"} />
        </Button>
        <Menu id="mode">
          <div className="w-60 m-8">
            <Slider
              marks={{ 1: "1", 2: "1.2", 3: "1.5", 4: "1.8", 5: "2" }}
              min={1}
              max={5}
              value={valueFontSize}
              onChange={(e: any) => setValueFontSize(e)}
            />
          </div>
        </Menu>
      </MenuCore>
    </Fragment>
  );
};

export default FontSize;
