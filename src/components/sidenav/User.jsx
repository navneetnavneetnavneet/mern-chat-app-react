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
        className="w-full h-[10vh] px-2 md:px-4 hover:bg-zinc-200 duration-300 flex items-center gap-2 md:gap-3 border-b border-zinc-400 cursor-pointer"
      >
        <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={user.profileImage.url}
            alt=""
          />
        </div>
        <h1 className="text-[1.25rem] md:text-[1.5rem] font-medium tracking-tighter">
          {user.fullName}
        </h1>
      </div>
    )
  );
};

export default User;
