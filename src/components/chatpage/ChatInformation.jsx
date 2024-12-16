import React, { useState } from "react";
import { useSelector } from "react-redux";

const ChatInformation = ({ selectedChat, chatInfo, setChatInfo }) => {
  const { user } = useSelector((state) => state.userReducer);

  const oppositeUser =
    selectedChat &&
    selectedChat.isGroupChat === false &&
    selectedChat.users.find((u) => u._id !== user?._id);

  return (
    selectedChat && (
      <div className="w-full h-screen overflow-x-hidden overflow-y-auto pb-10 text-black bg-zinc-100 absolute left-0 top-0">
        <div className="w-full h-[10vh] px-4 py-4 border-b border-zinc-400 flex items-center justify-between">
          <i
            onClick={() => setChatInfo(!chatInfo)}
            className="ri-arrow-left-line text-xl cursor-pointer"
          ></i>
          <h1 className="text-3xl md:text-2xl font-semibold">Details</h1>
          <div className="flex items-center gap-5">
            <i className="ri-bookmark-line text-xl"></i>
            <i className="ri-menu-line text-xl"></i>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center my-5">
          <div className="w-[30vw] h-[30vw] md:w-[10vw] md:h-[10vw] rounded-full overflow-hidden">
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
          <h1 className="text-2xl font-semibold mt-5">
            {selectedChat?.isGroupChat
              ? selectedChat?.chatName
              : oppositeUser?.fullName}
          </h1>
          {!selectedChat?.isGroupChat && (
            <h3 className="text-xl font-medium text-zinc-600">
              {oppositeUser?.email}
            </h3>
          )}
          {selectedChat?.isGroupChat && (
            <h3 className="text-base font-medium text-zinc-600">
              Group : {selectedChat?.users.length} members
            </h3>
          )}
        </div>
        <div className="w-full border-y border-zinc-400 px-4 py-4">
          <div className="flex items-center gap-2">
            <i className="ri-notification-line text-xl font-medium"></i>
            <h3 className="text-xl md:text-base font-medium">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-image-line font-medium"></i>
            <h3 className="text-xl md:text-base font-medium">
              Media visibility
            </h3>
          </div>
        </div>
        {selectedChat.isGroupChat && (
          <div className="w-full">
            <div className="w-full px-4 py-2 flex items-center justify-between">
              <h3 className="text-base font-medium text-zinc-600">
                {selectedChat?.users.length} members
              </h3>
              <i className="ri-search-line text-xl font-medium"></i>
            </div>
            {selectedChat.users.length > 0
              ? selectedChat.users.map((u) => (
                  <div
                    key={u._id}
                    className="w-full h-[10vh] px-4 py-4 border-b border-zinc-400 flex items-center gap-2"
                  >
                    <div className="w-[12vw] h-[12vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={u.profileImage?.url}
                        alt=""
                      />
                    </div>
                    <h1 className="text-xl font-medium leading-none">
                      {u.fullName}
                    </h1>
                  </div>
                ))
              : ""}
          </div>
        )}
      </div>
    )
  );
};

export default ChatInformation;
