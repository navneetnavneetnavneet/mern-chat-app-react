import React from "react";

const Users = () => {
  return (
    <div className="scroll w-full h-[70vh] overflow-x-hidden overflow-y-auto">
      <div className="user w-full h-[10vh] px-4 py-4 flex items-center gap-2 border-b border-zinc-400">
        <div className="w-[16vw] h-[16vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1730545160269-5f54484782da?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold leading-none">Harsh Bhaiya</h1>
          <small className="text-lg font-semibold opacity-70 leading-none">
            offline
          </small>
        </div>
      </div>
    </div>
  );
};

export default Users;
