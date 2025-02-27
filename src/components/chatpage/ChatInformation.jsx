import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAccessChat,
  asyncFetchAllChats,
  asyncExitUserFromGroup,
} from "../../store/actions/chatActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingPage from "../../pages/LoadingPage";

const ChatInformation = ({ selectedChat, chatInfo, setChatInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(selectedChat);

  const { user } = useSelector((state) => state.userReducer);

  const oppositeUser =
    selectedChat &&
    selectedChat.isGroupChat === false &&
    selectedChat.users.find((u) => u._id !== user?._id);

  const handleExitUser = async () => {
    if (user) {
      await dispatch(asyncExitUserFromGroup(selectedChat._id));
      toast.success(`User exit from ${selectedChat.chatName} group`);
      navigate("/");
    }
  };

  return selectedChat ? (
    <div className="w-full h-screen overflow-x-hidden overflow-y-auto pb-10 text-black bg-zinc-100 absolute z-[999] left-0 top-0">
      <div className="w-full px-4 md:px-8 py-2 border-b border-zinc-400 flex items-center justify-between">
        <i
          onClick={() => setChatInfo(!chatInfo)}
          className="ri-arrow-left-line text-[1.2rem] cursor-pointer"
        ></i>
        <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold">
          Chat Details
        </h1>
        <i className="ri-menu-line text-[1.2rem] cursor-pointer"></i>
      </div>
      <div className="flex flex-col justify-center items-center my-5">
        <div className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] rounded-full overflow-hidden">
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
        <h1 className="text-[1.75rem] md:text-[2rem] font-bold mt-5">
          {selectedChat?.isGroupChat
            ? selectedChat?.chatName
            : oppositeUser?.fullName}
        </h1>
        <h3 className="text-[1rem] font-medium text-zinc-600">
          {!selectedChat.isGroupChat
            ? oppositeUser?.email
            : `Group : ${selectedChat?.users.length} members`}
        </h3>
      </div>
      <div className="w-full flex flex-col gap-2 border-y border-zinc-400 px-4 md:px-8 py-4">
        <div className="flex items-center gap-2">
          <i className="ri-notification-line text-[1.2rem] font-medium"></i>
          <h3 className="text-[1.25rem] font-medium">Notifications</h3>
        </div>
        <div className="flex items-center gap-2">
          <i className="ri-image-line font-medium text-[1.2rem]"></i>
          <h3 className="text-[1.25rem] font-medium">Media visibility</h3>
        </div>
      </div>
      {selectedChat.isGroupChat && (
        <div className="w-full">
          <div className="w-full px-4 md:px-8 py-2 flex items-center justify-between">
            <h3 className="text-[1rem] font-medium text-zinc-600">
              {selectedChat?.users.length} members
            </h3>
            <i className="ri-search-line text-[1.2rem] font-medium cursor-pointer"></i>
          </div>
          {selectedChat.users.length > 0
            ? selectedChat.users.map((u) => (
                <div
                  onClick={async () => {
                    if (u._id === user?._id) {
                      return navigate("/");
                    }
                    const { chatId } = await dispatch(asyncAccessChat(u._id));
                    await dispatch(asyncFetchAllChats());
                    setChatInfo(!chatInfo);
                    navigate(`/chat/${chatId}`);
                  }}
                  key={u._id}
                  className={`w-full px-4 md:px-8 py-2 flex items-center justify-between cursor-pointer border-b border-zinc-400`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={u.profileImage?.url}
                        alt=""
                      />
                    </div>
                    <h1 className="text-[1.25rem] md:text-[1.5rem] font-medium leading-none">
                      {u.fullName.slice(0, 14)}
                    </h1>
                  </div>
                  {selectedChat.groupAdmin._id === u._id ? (
                    <h6 className="text-[.7rem] font-medium text-zinc-600 px-2 py-1 rounded bg-zinc-300">
                      Admin
                    </h6>
                  ) : (
                    ""
                  )}
                </div>
              ))
            : ""}
          <div className="w-full border-b border-zinc-400 flex flex-col gap-2 px-4 md:px-8 py-4">
            <div className="w-fit flex items-center gap-2 cursor-pointer">
              <i className="ri-heart-line text-[1.2rem] font-medium text-black"></i>
              <h3 className="text-[1.25rem] font-medium text-black">
                Add to Favourites
              </h3>
            </div>
            <div
              onClick={handleExitUser}
              className="w-fit flex items-center gap-2 cursor-pointer"
            >
              <i className="ri-logout-box-r-line text-[1.2rem] font-medium text-red-500"></i>
              <h3 className="text-[1.25rem] font-medium text-red-500">
                Exit group
              </h3>
            </div>
            <div className="w-fit flex items-center gap-2 cursor-pointer">
              <i className="ri-thumb-down-line text-[1.2rem] font-medium text-red-500"></i>
              <h3 className="text-[1.25rem] font-medium text-red-500">
                Report group
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ChatInformation;
