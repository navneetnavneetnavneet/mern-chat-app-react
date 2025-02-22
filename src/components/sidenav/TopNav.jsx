import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);

  return (
    <div className="w-full py-2 px-4 flex items-center justify-between border-b border-zinc-400">
      <h1 className="text-[3rem] md:text-[4rem] font-bold leading-none text-blue-600">
        Chat<span className="text-orange-600">X</span>
      </h1>
      <div
        onClick={() => navigate("/profile")}
        className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 cursor-pointer rounded-full overflow-hidden"
      >
        <img
          className="w-full h-full object-cover"
          src={user?.profileImage?.url}
          alt=""
        />
      </div>
    </div>
  );
};

export default TopNav;
