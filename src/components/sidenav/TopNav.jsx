import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);

  return (
    <div className="w-full h-[10vh] px-4 flex items-center justify-between border-b border-zinc-400">
      <h1 className="text-5xl font-bold text-blue-600">
        Chat<span className="text-orange-600">X</span>
      </h1>
      <div
        onClick={() => navigate("/profile")}
        className="w-12 h-12 md:w-14 md:h-14 cursor-pointer rounded-full overflow-hidden"
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
