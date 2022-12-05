import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import { InputCheckbox } from "../../components/checkbox/Checkbox";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import useToggle from "../../hooks/useToggle";
import { BsEye } from "react-icons/bs";
const Pages = () => {
  const [check, setCheck] = useState(false);
  const { state, close, open } = useToggle();
  return (
    <div className="page-bulder">
      <div className="flex justify-between items-center mt-5 mb-10">
        <Link to={"/add-new-page"}>
          <Button>صفحه جدید</Button>
        </Link>
        <div>
          <Button>فیلترها</Button>
        </div>
      </div>
      <hr />
      <div>
        <div className="list-pages">
          <div
            className="p-5 bg-bg-default my-8 rounded-lg flex justify-between"
            onMouseEnter={open}
            onMouseLeave={close}
          >
            <InputCheckbox checked={check} setChecked={() => setCheck(state => !state)} />
            <div className="title text-center flex flex-col  items-center">
              <span>Home</span>
              {state && (
                <span className="cursor-pointer">
                  <BsEye />
                </span>
              )}
            </div>
            <div className="author">
              <span>amiryp</span>
            </div>
            <div className="Date text-center">
              <span className="block">published</span>
              <span className="block">1400/07/08 at 6:20 pm</span>
            </div>
            <div className="actions">
              <Button
                color="danger-outline"
                className="mr-1"
                style={{ paddingLeft: "8px", paddingRight: "8px" }}
              >
                <AiOutlineDelete size={"1rem"} />
              </Button>
              <Button
                color="primary-outline"
                className="mr-1"
                style={{ paddingLeft: "8px", paddingRight: "8px" }}
              >
                <AiOutlineEdit size={"1rem"} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
