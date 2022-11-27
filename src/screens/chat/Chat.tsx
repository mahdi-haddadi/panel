import classNames from "classnames";
import { memo, useState } from "react";
import Badge from "../../components/badge/Badge";
import Button from "../../components/button/Button";
import InputBase from "../../components/input/textField/components/InputBase";
import { chatData } from "./../../data/chats";
import { AiOutlineSend } from "react-icons/ai";
import { BsCheck2All, BsPaperclip } from "react-icons/bs";
const SidebarChat = memo(() => {
  return (
    <div
      className="sidebar-chat w-10 rounded-full bg-bg-default overflow-auto shadow-xl"
      style={{ height: `calc(100vh - 200px)` }}
    >
      <div className="users">
        {chatData.map((user,index) => {
          return (
            <Badge key={index} value={""} color={user.active ? `warning` : "dark"}>
              <div
                className={classNames(
                  "profile rounded-full my-4 h-10 overflow-hidden cursor-pointer w-full flex justify-center items-center",
                  { "bg-gray-500": !user.image }
                )}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.name[0]
                )}
              </div>
            </Badge>
          );
        })}
      </div>
    </div>
  );
});
const InputChat = memo(({ value, setValue, setChats }: any) => {
  const handleSubmit = () => {
    if (value.length > 0) {
      setChats((prev: any) => [
        ...prev,
        {
          text: value.trim(" "),
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
      ]);
      setValue("");
    }
  };
  return (
    <div className="absolute bottom-0 left-0 w-full px-6 my-2 flex">
      <div className="order-3">
        <Button className="order-3" rounded={true} color="link">
          <label htmlFor="file">
            <input type="file" id="file" className="hidden" />
            <BsPaperclip size={"1.3rem"} />
          </label>
        </Button>
      </div>
      <div className="order-2 w-full mx-2">
        <InputBase
          className="w-full bg-bg-paper"
          placeholder="type"
          initialValue={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Button type="submit" rounded={true} onClick={handleSubmit}>
        <AiOutlineSend />
      </Button>
    </div>
  );
});
const ChatBox = memo(() => {
  const [text, setText] = useState("");
  const [chats, setChats] = useState([]);
  return (
    <div
      className="chat-box h-screen overflow-auto bg-bg-default col-span-11 rounded-lg relative px-4 py-4"
      style={{ height: `calc(100vh - 200px)` }}
    >
      <div className="me text-right w-full my-2">
        <div className="bg-blue-400 px-5 py-4 rounded-xl inline-block relative">
          <span>سلام</span>
          <span className="absolute right-1 bottom-1">
            <BsCheck2All size={".8rem"} className="text-text-primary" />
          </span>
          <span
            className="absolute left-1 bottom-1 text-bold"
            style={{ fontSize: "8px" }}
          >
            12:00
          </span>
        </div>
      </div>
      <div className="answer text-left w-full my-2">
        <div className="bg-orange-300 px-5 py-4 rounded-xl inline-block relative">
          <span>سلام</span>
          <span
            className="absolute left-1 bottom-1 text-bold"
            style={{ fontSize: "8px" }}
          >
            12:01
          </span>
        </div>
      </div>
      {chats.map((i: any, index) => {
        return (
          <div key={index} className="me text-right w-full my-2">
            <div className="bg-blue-400 px-5 py-4 rounded-xl inline-block relative">
              <span>{i.text}</span>
              <span className="absolute right-1 bottom-1">
                <BsCheck2All size={".8rem"} className="text-text-primary" />
              </span>
              <span
                className="absolute left-1 bottom-1 text-bold"
                style={{ fontSize: "8px" }}
              >
                {i.time}
              </span>
            </div>
          </div>
        );
      })}
      <InputChat value={text} setValue={setText} setChats={setChats} />
    </div>
  );
});

const Chat = () => {
  return (
    <div className="chat-container grid grid-cols-12 my-10">
      <SidebarChat />
      <ChatBox />
    </div>
  );
};

export default Chat;
