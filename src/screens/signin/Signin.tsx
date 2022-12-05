import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Checkbox, {
  InputCheckbox,
  LabelCheckbox,
} from "../../components/checkbox/Checkbox";
import { signinAdmin } from "../../redux/features/admin/adminSlice";
import Translator from "../../i18n/Translator";
import useToggle from "../../hooks/useToggle";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { RootState } from "../../redux/store";
import Button from "../../components/button/Button";
import LoadingSpin from "../../components/loading/LoadingSpin";

const Signin = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const { state: shpwPassword, toggle: toggleShowPassword } = useToggle();
  const { loading, error } = useSelector((state: RootState) => state.admin);
  const [form, setForm] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(signinAdmin({ user: form, rememberMe }));
  };

  return (
    <div className="h-screen bg-gradient-to-tl from-green-400 to-indigo-900 w-full py-16 px-4">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
          <div className="flex font-bold justify-center">
            <img className="w-20" src="/images/salin-logo.png" alt="logo" />
          </div>
          <p
            tabIndex={0}
            aria-label="Login to your account"
            className="text-3xl text-center text-gray-700 mt-4"
          >
            <Translator>signin</Translator>
          </p>

          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="relative mt-8">
              <input
                type="text"
                id="username"
                name="username"
                className=" outline-none border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full px-3"
                // placeholder={t._('username')}
                onChange={handleChangeForm}
                required
              />
            </div>
            <div className="relative mt-8">
              <div className="relative flex items-center justify-center">
                <input
                  type={shpwPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className=" border rounded outline-none text-xs font-medium leading-none text-gray-800 py-3  w-full px-3 "
                  // placeholder={t._('password')}
                  onChange={handleChangeForm}
                  required
                />
                <div
                  className="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={toggleShowPassword}
                >
                  {shpwPassword ? <BsEyeSlash /> : <BsEye />}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center my-4">
              <div className="flex justify-center items-center">
                <Checkbox
                  checked={rememberMe}
                  setChecked={() => setRememberMe((state) => !state)}
                >
                  <InputCheckbox style={{ display: "inline-block" }} />
                  <LabelCheckbox>
                    <span className="mx-2">
                      {<Translator>rememberMe</Translator>}
                    </span>
                  </LabelCheckbox>
                </Checkbox>
              </div>
              <div>
                <Translator>forget-password</Translator>
              </div>
            </div>
            {error && typeof error === "object" ? (
              !error?.user && (
                <p className="text-red-500">
                  <Translator>incorrect-username-password</Translator>
                </p>
              )
            ) : (
              <p className="text-red-500">{error}</p>
            )}
            <div className="mt-8">
              <Button
                type="submit"
                color="primary"
                disable={loading}
                className="focus:ring-2 focus:ring-offset-2 text-base tracking-widest font-semibold leading-none text-white focus:outline-none border rounded  py-3 w-full"
              >
                {loading ? (
                  <LoadingSpin color="info" size="sm" />
                ) : (
                  <Translator>login</Translator>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
