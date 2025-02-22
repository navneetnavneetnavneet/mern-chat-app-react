import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Chats = () => {
  const { user, onlineUsers } = useSelector((state) => state.userReducer);
  const { chats } = useSelector((state) => state.chatReducer);

  const isUserOnline = (userId) => onlineUsers.includes(userId);

  return (
    <div className="scroll w-full max-h-[70vh] overflow-x-hidden overflow-y-auto">
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
              className="w-full px-4 py-2 flex items-center gap-3 border-b border-zinc-400"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-full overflow-hidden">
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
                <h1 className="text-[1.25rem] md:text-[1.5rem] font-medium leading-none">
                  {!chat.isGroupChat ? chatUser?.fullName : chat.chatName}
                </h1>
                {!chat.isGroupChat && (
                  <small
                    className={`${
                      isOnline ? "text-green-800" : "opacity-50"
                    } text-[1rem] font-medium leading-none`}
                  >
                    {isOnline ? "online" : "offline"}
                  </small>
                )}
              </div>
            </Link>
          );
        })
      ) : (
        <h1 className="text-[1rem] pt-5 font-medium w-full text-center opacity-50">
          Chats are not present.
        </h1>
      )}
    </div>
  );
};

export default Chats;
