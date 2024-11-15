import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedChat } from "../../../store/reducers/chatSlice";

const Users = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { chats } = useSelector((state) => state.chatReducer);

  return (
    <div className="scroll w-full h-[70vh] overflow-x-hidden overflow-y-auto">
      {chats.length > 0 ? (
        chats.map((chat) => (
          <Link
            key={chat._id}
            to={`/chat/${chat._id}`}
            className="user w-full h-[10vh] px-4 py-4 flex items-center gap-2 border-b border-zinc-400"
          >
            <div className="w-[16vw] h-[16vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={
                  !chat.isGroupChat
                    ? chat.users[0]._id === user._id
                      ? chat.users[1].profileImage
                      : chat.users[0].profileImage
                    : "https://images.unsplash.com/photo-1730724620244-40d6e978acd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D"
                }
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-medium leading-none">
                {!chat.isGroupChat
                  ? chat.users[0]._id === user._id
                    ? chat.users[1].fullName
                    : chat.users[0].fullName
                  : chat.chatName}
              </h1>
              <small className="text-lg md:text-xs font-medium opacity-70 leading-none">
                offline
              </small>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-sm pt-5 font-medium w-full text-center opacity-50">
          Chats are not present.
        </h1>
      )}
    </div>
  );
};

export default Users;
