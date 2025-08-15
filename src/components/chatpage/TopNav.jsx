import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();

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
      <div className="w-full h-[10vh] px-2 md:px-4 text-white flex items-center justify-between border-b border-zinc-400">
        <div className="w-full flex items-center gap-2 md:gap-3 cursor-pointer">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-[1.25rem] cursor-pointer"
          ></i>
          <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                selectedChat?.isGroupChat
                  ? selectedChat.groupImage.url
                  : oppositeUser?.profileImage?.url
              }
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[1.25rem] md:text-[1.5rem] font-medium tracking-tighter leading-tight">
              {selectedChat?.isGroupChat
                ? selectedChat?.chatName.slice(0, 10)
                : oppositeUser?.fullName.slice(0, 14)}
            </h1>
            {!selectedChat.isGroupChat && (
              <small
                className={`${
                  isOppositeUserOnline ? "text-green-500" : "text-gray-500"
                } text-sm font-medium tracking-tighter leading-none`}
              >
                {isOppositeUserOnline ? "online" : "offline"}
              </small>
            )}
          </div>
        </div>
        <div className="flex items-center gap-5 md:gap-10">
          {selectedChat.isGroupChat && (
            <i
              onClick={() =>
                navigate(`/chat/${selectedChat._id}/update-group-details`)
              }
              className="ri-edit-box-line text-[1.25rem] cursor-pointer"
            ></i>
          )}
          <i className="ri-phone-line text-[1.25rem] cursor-pointer"></i>
          <i className="ri-live-line text-[1.25rem] cursor-pointer"></i>
          <i
            onClick={() =>
              navigate(`/chat/${selectedChat._id}/chat-information`)
            }
            className="ri-information-line text-[1.25rem] cursor-pointer"
          ></i>
        </div>
      </div>
    )
  );
};

export default TopNav;
