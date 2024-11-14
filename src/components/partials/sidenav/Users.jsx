import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const { allUser } = useSelector((state) => state.userReducer);
  console.log(allUser);

  return (
    <div className="scroll w-full h-[70vh] overflow-x-hidden overflow-y-auto">
      {allUser.length > 0 ? (
        allUser.map((user) => (
          <Link
          to={`/chat/${user._id}`}
            key={user._id}
            className="user w-full h-[10vh] px-4 py-4 flex items-center gap-2 border-b border-zinc-400"
          >
            <div className="w-[16vw] h-[16vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={user.profileImage}
                alt=""
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-medium leading-none">
                {user.fullName}
              </h1>
              <small className="text-lg md:text-xs font-medium opacity-70 leading-none">
                offline
              </small>
            </div>
          </Link>
        ))
      ) : (
        <h1>Chats are not present.</h1>
      )}
    </div>
  );
};

export default Users;
