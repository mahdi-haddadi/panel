import { Fragment } from "react";
import Menu from "../../../components/menu/Menu";
import MenuItem from "../../../components/menu/MenuItem";
import { CgProfile } from "react-icons/cg";
import { BsBoxArrowInLeft, BsEnvelopeOpen } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/admin/adminSlice";
import { RootState } from "../../../redux/store";
import MenuCore from "../../../components/menu/MenuCore";
import MenuToggle from "../../../components/menu/MenuToggle";
const Profile = () => {
  const { user } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();
  const data = [
    {
      id: 1,
      content: (
        <div className="flex justify-start items-center">
          <CgProfile size={"1.2rem"} />
          <span className="mx-2">My Profile</span>
        </div>
      ),
      set: () => {},
    },
    {
      id: 2,
      content: (
        <div className="flex justify-start items-center">
          <BsEnvelopeOpen size={"1.2rem"} />
          <span className="mx-2">Inbox</span>
        </div>
      ),
      set: () => {},
    },
    {
      id: 3,
      content: (
        <div className="flex justify-start items-center">
          <BsBoxArrowInLeft size={"1.2rem"} />
          <span className="mx-2">Logout</span>
        </div>
      ),
      set: () => {
        dispatch(logout());
      },
    },
  ];
  return (
    <Fragment>
      <MenuCore>
        <MenuToggle>
          <span className="mx-2 cursor-pointer" data-el="button">
            <div className="rounded-full w-10 h-10 flex justify-center items-center bg-gray-400">
              {user?.username.split("")[0] ? user?.username.split("")[0] : "?"}
            </div>
          </span>
        </MenuToggle>
        <Menu id="my-profile" className="w-40">
          {data.map((i) => {
            return (
              <MenuItem key={i.id} onClick={() => i.set()} className="my-1">
                {i.content}
              </MenuItem>
            );
          })}
        </Menu>
      </MenuCore>
    </Fragment>
  );
};

export default Profile;
