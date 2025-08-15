import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncAccessChat,
  asyncExitUserFromGroup,
  asyncFetchAllChats,
} from "../store/actions/chatActions";
import { toast } from "react-toastify";

const ChatInformationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedChat } = useSelector((state) => state.chatReducer);
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

  return (
    selectedChat && (
      <div className="absolute top-0 left-0 w-full h-screen overflow-x-hidden overflow-y-auto bg-zinc-200">
        <div className="w-full h-[10vh] px-2 md:px-4 flex items-center justify-between border-b border-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-[1.25rem] cursor-pointer"
          ></i>
          <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tighter">
            Chat Information
          </h1>
          <i className="ri-menu-line text-[1.25rem] cursor-pointer"></i>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 pt-10">
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
          <div className="">
            <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tighter text-center leading-none">
              {selectedChat?.isGroupChat
                ? selectedChat?.chatName
                : oppositeUser?.fullName}
            </h1>
            <h4 className="text-[1rem] md:text-[1.25rem] font-medium tracking-tighter text-center opacity-80">
              {!selectedChat.isGroupChat
                ? oppositeUser?.email
                : `Group : ${selectedChat?.users.length} members`}
            </h4>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 mt-5 border-y border-zinc-400 px-2 md:px-4 py-4">
          <div className="flex items-center gap-2">
            <i className="ri-notification-line text-[1.25rem] font-medium"></i>
            <h3 className="text-[1.25rem] font-medium">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-image-line font-medium text-[1.25rem]"></i>
            <h3 className="text-[1.25rem] font-medium">Media visibility</h3>
          </div>
        </div>
        {selectedChat.isGroupChat && (
          <div className="w-full">
            <div className="w-full px-2 md:px-4 py-2 flex items-center justify-between">
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

                      await navigate(`/chat/${chatId}`);
                    }}
                    key={u._id}
                    className={`w-full px-2 md:px-4 py-2 flex items-center justify-between cursor-pointer border-b border-zinc-400`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={u.profileImage?.url}
                          alt=""
                        />
                      </div>
                      <h1 className="text-[1.25rem] md:text-[1.5rem] font-medium tracking-tighter">
                        {u.fullName.slice(0, 25)}
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
                <h3 className="text-[1.25rem] md:text-[1.5rem] font-medium tracking-tighter">
                  Add to Favourites
                </h3>
              </div>
              <div
                onClick={handleExitUser}
                className="w-fit flex items-center gap-2 cursor-pointer"
              >
                <i className="ri-logout-box-r-line text-[1.2rem] font-medium text-red-500"></i>
                <h3 className="text-[1.25rem] md:text-[1.5rem] font-medium tracking-tighter text-red-500">
                  Exit group
                </h3>
              </div>
              <div className="w-fit flex items-center gap-2 cursor-pointer">
                <i className="ri-thumb-down-line text-[1.2rem] font-medium text-red-500"></i>
                <h3 className="text-[1.25rem] md:text-[1.5rem] font-medium tracking-tighter text-red-500">
                  Report group
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ChatInformationPage;
