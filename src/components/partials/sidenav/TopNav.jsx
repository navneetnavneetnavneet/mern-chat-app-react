import React from "react";

const TopNav = () => {
  return (
    <div className="w-full h-[10vh] px-4 py-4 flex items-center justify-between border-b border-zinc-400">
      <h1 className="text-5xl font-bold text-blue-600">
        Chat<span className="text-orange-600">X</span>
      </h1>
      <div className="w-[15vw] h-[15vw] md:w-[3vw] md:h-[3vw] rounded-full flex items-center justify-center bg-red-500">
        profile
      </div>
    </div>
  );
};

export default TopNav;
