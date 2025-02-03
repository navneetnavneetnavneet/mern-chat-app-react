import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Chats = () => {
  const { user, onlineUsers } = useSelector((state) => state.userReducer);
  const { chats } = useSelector((state) => state.chatReducer);

  const isUserOnline = (userId) => onlineUsers.includes(userId);

  return (
    <div className="scroll w-full h-[70vh] overflow-x-hidden overflow-y-auto">
      {chats.length > 0 ? (
        chats.map((chat) => {
          const chatUser = !chat.isGroupChat
            ? chat.users[0]._id === user._id
              ? chat.users[1]
              : chat.users[0]
            : null;

          const isOnline = chatUser ? isUserOnline(chatUser._id) : false;

          return (
            <Link
              key={chat._id}
              to={`/chat/${chat._id}`}
              className="user w-full h-[10vh] px-4 py-4 flex items-center gap-2 border-b border-zinc-400"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={
                    !chat.isGroupChat
                      ? chatUser?.profileImage?.url
                      : "https://images.unsplash.com/photo-1730724620244-40d6e978acd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-medium leading-none">
                  {!chat.isGroupChat ? chatUser?.fullName : chat.chatName}
                </h1>
                {!chat.isGroupChat && (
                  <small
                    className={`${
                      isOnline ? "text-green-800" : "text-zinc-400"
                    } text-sm md:text-xs font-medium leading-none`}
                  >
                    {isOnline ? "online" : "offline"}
                  </small>
                )}
              </div>
            </Link>
          );
        })
      ) : (
        <h1 className="text-sm pt-5 font-medium w-full text-center opacity-50">
          Chats are not present.
        </h1>
      )}
    </div>
  );
};

export default Chats;
