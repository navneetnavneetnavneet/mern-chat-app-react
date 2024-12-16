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
        className="w-[12vw] h-[12vw] md:w-[3.5vw] md:h-[3.5vw] cursor-pointer rounded-full overflow-hidden"
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
