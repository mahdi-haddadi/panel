import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import { RootState } from "../../redux/store";
import { ToJalali } from "../../utils/changeDate";
import ActionTable from "./components/ActionTable";
import Translator from "../../i18n/Translator";
import InvitedUsersAction from "./components/InvitedUsersAction";
import { getPlayers } from "../../redux/features/player/playerSlice";
import Slider from "../../components/slider/Slider";
import BarChart from "../../components/charts/BarChart";
import { UserData } from "../../data/Chart";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";
import { PlayerData } from "../../data/PlayerData";

const Main = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "مجموع اکانت ها",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [parseData, setParseData] = useState();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getPlayers());
  // }, [dispatch]);

  const { data, error, loading } = useSelector(
    (state: RootState) => state.players
  );
  const [tableSelected, setTableSelected] = useState<number[]>([]);
  const columns = useMemo(
    () => [
      {
        key: "fullname",
        title: <Translator>fullname</Translator>,
      },
      {
        key: "phone",
        title: <Translator>phone</Translator>,
      },
      {
        key: "chance",
        title: <Translator>chance</Translator>,
      },
      {
        key: "run",
        title: <Translator>run</Translator>,
      },
      {
        key: "maxScore",
        title: <Translator>max-score</Translator>,
      },
      {
        key: "totalScore",
        title: <Translator>total-score</Translator>,
      },
      {
        key: "createAt",
        title: <Translator>createAt</Translator>,
      },
    ],
    []
  );
  useEffect(() => {
    if (data && data.length > 0) {
      const newData: any = data.map((i: any) => {
        return {
          ...i,
          createAt: ToJalali(i.createAt),
        };
      });

      setParseData(newData);
    }
  }, [data]);
  const actionsTable = useMemo(
    () => [
      {
        key: "invitedUsers",
        title: <Translator>invitedUsers</Translator>,
        content: (id: number) => {
          return <InvitedUsersAction id={id} />;
        },
      },
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
  const dataExcel = data.map((player) => ({
    fullname: player.fullname,
    phone: player.phone,
    chance: player.chance,
    maxScore: player.maxScore,
    totalScore: player.totalScore,
    createAt: ToJalali(player.createAt),
    run: player.run,
    invitedUsers: player.invitedUsers.length,
  }));
  const [value, setValue] = useState<number>(10);
  // console.log('render')
  // console.log(t);
  return (
    <Fragment>
      {/*<Slider value={value} setValue={setValue} step={4} />*/}
      {/*  <BarChart charData={userData} />*/}

      <div className={"w-full"}>
        <div
          className={
            "grid grid-cols-1 gap-4 justify-center w-full md:grid-cols-2 lg:grid-cols-4"
          }
        >
          <div
            className={
              "text-xl shadow-2xl p-6 flex justify-center items-center rounded-xl flex-col"
            }
          >
            <p className={"text-center text-text-primary"}>مجموع کل یوزر ها</p>
            <p className={"text-center mt-3 text-text-primary"}>562</p>
          </div>

          <div
            className={
              "text-xl shadow-2xl p-6 flex justify-center items-center rounded-xl flex-col"
            }
          >
            <p className={"text-center text-text-primary"}>یوزر های فعال</p>
            <p className={"text-center mt-3 text-text-primary"}>418</p>
          </div>

          <div
            className={
              "text-xl shadow-2xl p-6 flex justify-center items-center rounded-xl flex-col"
            }
          >
            <p className={"text-center text-text-primary"}>تعداد ادمین ها</p>
            <p className={"text-center mt-3 text-text-primary"}>8</p>
          </div>

          <div
            className={
              "text-xl shadow-2xl p-6 flex justify-center items-center rounded-xl flex-col"
            }
          >
            <p className={"text-center text-text-primary"}>
              تعداد محصولات فروشگاه
            </p>
            <p className={"text-center mt-3 text-text-primary"}>47</p>
          </div>
        </div>
      </div>

      <div className={"p-5 shadow-2xl grid grid-cols-1 lg:grid-cols-2"}>
        <div className={"my-20"}>
          <BarChart chartData={userData} />
        </div>
        <div className={"my-20"}>
          <LineChart chartData={userData} />
        </div>
      </div>

      <div className={"w-full"}>
        <div className={"mx-auto"}>
          <Table
            columns={columns}
            data={PlayerData || []}
            tableSelected={tableSelected}
            setTableSelected={setTableSelected}
            checkbox={true}
            loading={loading}
            actions={actionsTable}
            error={error}
            id={"table-players"}
          />
          <table
            id="table-players"
            className="hidden table-auto border-collapse border border-slate-500"
          >
            <thead>
              <tr>
                {columns.map((column: any, index) => {
                  return (
                    <th
                      style={{
                        border: "1px solid rgb(149,156,169)",
                        padding: "5px 10px",
                        textAlign: "center",
                      }}
                      key={index}
                    >
                      {column.title}
                    </th>
                  );
                })}
                <th
                  style={{
                    border: "1px solid rgb(149,156,169)",
                    padding: "5px 10px",
                    textAlign: "center",
                  }}
                >
                  کاربران دعوت کرده
                </th>
              </tr>
            </thead>
            <tbody>
              {dataExcel.map((i: any, index) => {
                return (
                  <tr key={index}>
                    {columns.map((c: any, index) => {
                      return (
                        <td
                          key={index}
                          style={{
                            border: "1px solid rgb(107,114,128)",
                            textAlign: "center",
                          }}
                        >
                          {i[c?.key]}
                        </td>
                      );
                    })}
                    <td
                      style={{
                        border: "1px solid rgb(107,114,128)",
                        textAlign: "center",
                      }}
                    >
                      {i.invitedUsers}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Main;
