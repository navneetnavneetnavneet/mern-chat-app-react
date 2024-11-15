import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userReducer);
  const { selectedChat } = useSelector((state) => state.chatReducer);

  const oppositeUser =
    selectedChat &&
    selectedChat.isGroupChat === false &&
    selectedChat.users.find((u) => u._id !== user._id);

  return (
    <div className="w-full h-[10vh] px-2 py-2 text-white flex items-center justify-between border-b border-zinc-400">
      <div className="flex items-center gap-2">
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
                : oppositeUser.profileImage
            }
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium leading-none">
            {selectedChat?.isGroupChat
              ? selectedChat?.chatName
              : oppositeUser?.fullName}
          </h1>
          <small className="text-lg md:text-xs font-medium opacity-70 leading-none">
            offline
          </small>
        </div>
      </div>
      <div className="flex items-center gap-5 text-2xl">
        <i className="ri-phone-line"></i>
        <i className="ri-live-line"></i>
      </div>
    </div>
  );
};

export default TopNav;
