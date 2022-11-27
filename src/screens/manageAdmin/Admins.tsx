import { Fragment, useMemo, useState } from "react";
import Table from "../../components/table/Table";
import Translator from "../../i18n/Translator";
import { adminsData } from "../../data/PlayerData";
import ActionTable from "../main/components/ActionTable";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";

const Admins = () => {
  const [tableSelected, setTableSelected] = useState<number[]>([]);

  const columns = useMemo(
    () => [
      {
        key: "fullname",
        title: <Translator>fullname-admin</Translator>,
      },
      {
        key: "email",
        title: <Translator>email</Translator>,
      },
      {
        key: "accessLevel",
        title: <Translator>access-level</Translator>,
        differentShow: (i: any) => {
          if (i.accessLevel === 1) {
            return <Translator>main-admin</Translator>;
          } else if (i.accessLevel === 2) {
            return <Translator>developer</Translator>;
          } else if (i.accessLevel === 3) {
            return <Translator>viewer</Translator>;
          }
        },
      },
      {
        key: "lastSignin",
        title: <Translator>last-signin</Translator>,
      },
      {
        key: "active",
        title: <Translator>active</Translator>,
        differentShow: (i: any) => {
          if (i.active) {
            return <div className="w-2 h-2 bg-green-500 rounded-full" />;
          } else {
            return <div className="w-2 h-2 bg-red-500 rounded-full" />;
          }
        },
      },
      {
        key: "creator",
        title: <Translator>creator</Translator>,
      },
      {
        key: "createAt",
        title: <Translator>date-of-creation</Translator>,
      },
    ],
    []
  );
  const actionsTable = useMemo(
    () => [
      {
        key: "action1",
        title: <Translator>action</Translator>,
        content: (id: Number) => {
          return <ActionTable id={id} />;
        },
      },
    ],
    []
  );
  return (
    <Fragment>
      <Button color="primary-outline">
        <Link to={"/add-admin"}>{<Translator>create-admin</Translator>}</Link>
      </Button>
      <Table
        columns={columns}
        data={adminsData || []}
        tableSelected={tableSelected}
        setTableSelected={setTableSelected}
        checkbox={true}
        actions={actionsTable}
        id={"table-admins"}
      />
    </Fragment>
  );
};

export default Admins;
