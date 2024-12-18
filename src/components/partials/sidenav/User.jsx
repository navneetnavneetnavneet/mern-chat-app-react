import React from "react";
import { useDispatch } from "react-redux";
import { asyncAccessChat } from "../../../store/actions/chatActions";
import { useNavigate } from "react-router-dom";

const User = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    user && (
      <div
        onClick={async () => {
          const { chatId } = await dispatch(asyncAccessChat(user._id));
          await navigate(`/chat/${chatId}`);
        }}
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
          <h1 className="text-2xl font-medium leading-none">{user.fullName}</h1>
        </div>
      </div>
    )
  );
};

export default User;
