import { useMemo, useState } from "react";
import Button from "../../components/button/Button";
import Checkbox, {
  InputCheckbox,
  LabelCheckbox,
} from "../../components/checkbox/Checkbox";
import Translator from "../../i18n/Translator";

const AddAdmin = () => {
  const [ckeckbox, setckeckbox] = useState(true);
  return (
    <div>
      <div className="block p-6 rounded-lg shadow-lg bg-bg-paper">
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="form-group mb-6">
              <input
                type="text"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                // placeholder={<Translator>fullname-admin</Translator>}
              />
            </div>
            <div className="form-group mb-6">
              <input
                type="email"
                className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                // placeholder={t._("email")}
              />
            </div>
            <div className="form-group mb-6">
              <input
                type="password"
                className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                // placeholder={t._("password")}
              />
            </div>
            <div className="form-group mb-6">
              <select
                className="form-control block w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                {/* <option value="1">{t._("main-admin")}</option> */}
                {/* <option value="2">{t._("developer")}</option> */}
                {/* <option value="3">{t._("viewer")}</option> */}
              </select>
            </div>
          </div>
          <Checkbox checked={ckeckbox} setChecked={() => setckeckbox(state => !state)}>
            <InputCheckbox style={{ display: "inline-block" }} />
            <LabelCheckbox>
              <span className="mx-2 text-text-secondary"><Translator>admin-is-active</Translator></span>
            </LabelCheckbox>
          </Checkbox>
          <Button className="block w-full my-7"><Translator>create</Translator></Button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
