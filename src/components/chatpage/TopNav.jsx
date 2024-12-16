import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdateChatPopup from "./UpdateChatPopup";
import ChatInformation from "./ChatInformation";

const TopNav = () => {
  const navigate = useNavigate();

  const [hidden, setHidden] = useState(true);
  const [chatInfo, setChatInfo] = useState(false);

  const { user, onlineUsers } = useSelector((state) => state.userReducer);
  const { selectedChat } = useSelector((state) => state.chatReducer);

  const oppositeUser =
    selectedChat &&
    selectedChat.isGroupChat === false &&
    selectedChat.users.find((u) => u._id !== user._id);

  const isOppositeUserOnline =
    oppositeUser && onlineUsers.includes(oppositeUser._id);

  return (
    selectedChat && (
      <div className="w-full h-[10vh] px-2 py-2 text-white flex items-center justify-between border-b border-zinc-400">
        <div
          onClick={() => setChatInfo(!chatInfo)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <i
            onClick={() => navigate("/")}
            className="ri-arrow-left-line text-2xl cursor-pointer"
          ></i>
          <div className="w-[16vw] h-[16vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                selectedChat?.isGroupChat
                  ? "https://images.unsplash.com/photo-1730545160269-5f54484782da?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  : oppositeUser?.profileImage?.url
              }
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium leading-none">
              {selectedChat?.isGroupChat
                ? selectedChat?.chatName.slice(0,10)
                : oppositeUser?.fullName.slice(0,15)}
            </h1>
            <small
              className={`${
                isOppositeUserOnline ? "text-green-600" : "opacity-70"
              } text-lg md:text-xs font-medium leading-none`}
            >
              {isOppositeUserOnline ? "online" : "offline"}
            </small>
          </div>
        </div>
        <div className="flex items-center gap-5 text-2xl">
          {selectedChat.isGroupChat && (
            <i
              onClick={() => setHidden(!hidden)}
              className="ri-edit-box-line cursor-pointer"
            ></i>
          )}
          <i className="ri-phone-line cursor-pointer"></i>
          <i className="ri-live-line cursor-pointer"></i>
        </div>
        {selectedChat.isGroupChat && (
          <UpdateChatPopup
            user={user}
            hidden={hidden}
            setHidden={setHidden}
            selectedChat={selectedChat}
          />
        )}
        {chatInfo && (
          <ChatInformation
            selectedChat={selectedChat}
            chatInfo={chatInfo}
            setChatInfo={setChatInfo}
          />
        )}
      </div>
    )
  );
};

export default TopNav;
