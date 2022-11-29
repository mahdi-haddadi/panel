import { Fragment, useCallback, useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import Badge from "../../../components/badge/Badge";
import Button from "../../../components/button/Button";
import Dialog from "../../../components/Dialog/Dialog";
import useToggle from "../../../hooks/useToggle";
import Translator from "../../../i18n/Translator";
import { RootState } from "../../../redux/store";

const InvitedUsersAction = ({ id }: any) => {
  const { data } = useSelector((state: RootState) => state.players);

  const { close, open, state } = useToggle();

  const [userInvited, setUserInvited] = useState<string[]>();

  const getUserInvited = useCallback(() => {
    let invitingPhones: string[] = [];
    if (data && data.length > 0) {
      invitingPhones = data.filter((player) => player.id === id)[0]
        .invitedUsers;
    }
    return invitingPhones;
  }, [data, id]);

  useEffect(() => {
    getUserInvited();
  }, [getUserInvited]);

  useEffect(() => {
    setUserInvited(getUserInvited());
  }, [getUserInvited]);

  const handleOpenDialog = () => {
    getUserInvited();
    open();
  };
  return (
    <Fragment>
      <div className="flex justify-center items-center">
        <Button
          className="cursor-pointer shadow-transparent focus:shadow-transparent"
          color="link"
          onClick={handleOpenDialog}
        >
          <Badge
            value={userInvited?.length || 0}
            className="rounded-full -left-3 top-0 px-2 py-2 flex items-center justify-center"
          >
            <AiOutlineEye color="#000" size={"1.2rem"} />
          </Badge>
        </Button>
      </div>
      <Dialog open={state} IsClose={close} size="md">
        <Dialog.Header>
          <div className="header-dialog p-5">
            <h1 className="text-lg text-blue-600 text-center font-bold">
              <Translator>invitedUsers</Translator>
            </h1>
          </div>
        </Dialog.Header>
        <Dialog.Body>
          <div className="body-dialog p-5">
            {userInvited && userInvited?.length > 0 ? (
              userInvited?.map((player) => {
                return <span key={player}>{player} ,</span>;
              })
            ) : (
              <p>He has not invited anyone</p>
            )}
          </div>
        </Dialog.Body>
      </Dialog>
    </Fragment>
  );
};

export default InvitedUsersAction;
