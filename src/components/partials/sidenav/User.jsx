import React from "react";

const User = () => {
  return (
    <div className="user w-full h-[10vh] px-4 py-4 flex items-center gap-2 border-b border-zinc-400">
      <div className="w-[16vw] h-[16vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={
            "https://images.unsplash.com/photo-1730724620244-40d6e978acd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D"
          }
          alt=""
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-medium leading-none">Harsh</h1>
      </div>
    </div>
  );
};

export default User;
