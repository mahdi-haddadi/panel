import { Fragment } from "react";
import { Field, Form } from "react-final-form";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMore } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/button/Button";
import Dialog from "../../../components/Dialog/Dialog";
import TextField from "../../../components/input/textField/TextField";
import Menu from "../../../components/menu/Menu";
import MenuCore from "../../../components/menu/MenuCore";
import MenuItem from "../../../components/menu/MenuItem";
import useDataGetter from "../../../hooks/useDataGetter";
import useToggle from "../../../hooks/useToggle";
import Translator from "../../../i18n/Translator";
import { getPlayers } from "../../../redux/features/player/playerSlice";
import { RootState } from "../../../redux/store";
import { rest } from "../../../services/api";
interface IItemAction {
  id: number;
  content: JSX.Element;
  set: () => void;
}
const ActionTable = ({ id }: any) => {
  const {
    close: closeDelete,
    state: stateDelete,
    open: openDelete,
  } = useToggle(false);
  const {
    close: closeUpdate,
    state: stateUpdate,
    open: openUpdate,
  } = useToggle(false);
  const { data }: any = useSelector((state: RootState) => state.players);
  const dispatch = useDispatch();
  const listActionData: IItemAction[] = [
    {
      id: 1,
      content: (
        <p className="flex justify-between items-center">
          <AiOutlineDelete />
          <Translator>delete</Translator>
        </p>
      ),
      set: () => openDelete(),
    },
    {
      id: 2,
      content: (
        <p className="flex justify-between items-center">
          <AiOutlineEdit />
          <Translator>update</Translator>
        </p>
      ),
      set: () => openUpdate(),
    },
  ];
  const { fetch: requestDeleteUser } = useDataGetter(
    rest.user.deleteUser,
    "delete",
    false,
    null,
    null,
    () => {
      dispatch(getPlayers());
    }
  );
  const { fetch: requestUpdateUser } = useDataGetter(
    rest.user.updateUser,
    "put",
    false,
    null,
    null,
    () => {
      dispatch(getPlayers());
    }
  );
  const onSubmit = (values: { chance: string }) => {
    requestUpdateUser({ chance: +values.chance, id: id });
  };

  return (
    <Fragment>
      <MenuCore>
        <Button
          className="cursor-pointer shadow-transparent focus:shadow-transparent"
          color="link"
        >
          <AiOutlineMore />
        </Button>
        <Menu>
          {listActionData.map((i: IItemAction) => {
            return (
              <MenuItem key={i.id} onClick={i.set}>
                {i.content}
              </MenuItem>
            );
          })}
        </Menu>
      </MenuCore>
      <Dialog open={stateDelete} IsClose={closeDelete} size="md">
        <Dialog.Header>
          <div className="header-dialog p-5">
            <h1 className="text-lg text-red-600 text-center font-bold">
              <Translator>delete-user</Translator>
            </h1>
          </div>
        </Dialog.Header>
        <Dialog.Body>
          <div className="body-dialog p-5">
            <p>
              <Translator>are-you-sure-to-delete-user</Translator>
              <strong>
                {data &&
                  data.length > 0 &&
                  data.find((i: any) => i.id === id)?.phone}
              </strong>
            </p>
          </div>
        </Dialog.Body>
        <Dialog.Footer>
          <div className="footer-dialog p-5">
            <Button
              color="danger-outline"
              onClick={() => requestDeleteUser({ id })}
            >
              <Translator>delete</Translator>
            </Button>
            <Button color="link" onClick={closeDelete}>
              <Translator>cancel</Translator>
            </Button>
          </div>
        </Dialog.Footer>
      </Dialog>
      <Dialog open={stateUpdate} IsClose={closeUpdate} size="md">
        <Dialog.Header>
          <div className="header-dialog p-5">
            <h1 className="text-lg text-blue-600 text-center font-bold">
              <Translator>update-user</Translator>
            </h1>
          </div>
        </Dialog.Header>
        <Dialog.Body>
          <div className="body-dialog p-5">
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="chance"
                      defaultValue={data.find((u: any) => u.id === id)?.chance}
                      render={({ input, meta }) => {
                        return (
                          <TextField
                            id="chance"
                            label={{
                              text: "Chance",
                              className: "text-slate-200",
                            }}
                            size="md"
                            {...input}
                          />
                        );
                      }}
                    />
                    <Dialog.Footer
                      style={{ backgroundColor: "unset" }}
                      className="mt-5"
                    >
                      <Button
                        color="info-outline"
                        type="submit"
                        onClick={fetch}
                      >
                        <Translator>update</Translator>
                      </Button>
                      <Button color="link" onClick={closeUpdate}>
                        <Translator>cancel</Translator>
                      </Button>
                    </Dialog.Footer>
                  </form>
                );
              }}
            />
          </div>
        </Dialog.Body>
      </Dialog>
    </Fragment>
  );
};

export default ActionTable;
