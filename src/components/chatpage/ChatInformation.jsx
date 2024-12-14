import React from "react";
import { useSelector } from "react-redux";

function ChatInformation({ selectedChat, chatInfoHidden, setChatInfoHidden }) {
  console.log(selectedChat);
  const { user } = useSelector((state) => state.userReducer);

  const oppositeUser =
    selectedChat &&
    selectedChat.isGroupChat === false &&
    selectedChat.users.find((u) => u._id !== user?._id);

  return (
    selectedChat && (
      <div
        className={`w-full h-screen overflow-x-hidden overflow-y-auto absolute z-10 text-black top-0 left-0 bg-zinc-100 `}
      >
        <div className="w-full h-[10vh] z-20 px-4 py-4 flex items-center justify-between">
          <i
            onClick={() => setChatInfoHidden(!chatInfoHidden)}
            className="ri-arrow-left-line text-xl cursor-pointer"
          ></i>
          <div className="flex items-center gap-5">
            <i className="ri-price-tag-line text-xl cursor-pointer"></i>
            <i className="ri-more-2-fill text-xl cursor-pointer"></i>
          </div>
        </div>
        <div className="border-b flex flex-col items-center justify-center border-zinc-400  px-4 py-4">
          <div className="w-[30vw] h-[30vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full overflow-hidden">
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
          <h1 className="text-xl font-semibold mt-5">
            {selectedChat?.isGroupChat
              ? selectedChat?.chatName
              : oppositeUser?.fullName}
          </h1>
          {selectedChat?.isGroupChat && (
            <h4 className="text-base font-medium text-zinc-600">
              Group - {selectedChat?.users.length} members
            </h4>
          )}
        </div>
        <div className="w-full h-[20vh] bg-emerald-200"></div>
        {selectedChat.isGroupChat && (
          <div className="w-full mb-20">
            <div className="w-full px-4 py-2 flex items-center justify-between">
              {selectedChat?.isGroupChat && (
                <h4 className="text-base font-medium text-zinc-600">
                  {selectedChat?.users.length} members
                </h4>
              )}
              <i className="ri-search-line text-zinc-600 font-semibold"></i>
            </div>
            {selectedChat?.users.length > 0
              ? selectedChat?.users.map((user) => (
                  <div
                    key={user._id}
                    className="user w-full h-[10vh] px-4 py-4 flex items-center gap-2 border-b border-zinc-400"
                  >
                    <div className="w-[16vw] h-[16vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={user.profileImage.url}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-2xl font-medium leading-none">
                        {user.fullName}
                      </h1>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        )}
      </div>
    )
  );
}

export default ChatInformation;
