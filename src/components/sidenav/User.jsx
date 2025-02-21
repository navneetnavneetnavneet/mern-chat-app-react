import React from "react";
import { useDispatch } from "react-redux";
import { asyncAccessChat } from "../../store/actions/chatActions";
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
        className="user w-full h-[10vh] px-4 py-4 flex items-center gap-2 cursor-pointer border-b border-zinc-400"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={user.profileImage.url}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-medium leading-none">{user.fullName}</h1>
        </div>
      </div>
    )
  );
};

export default User;
