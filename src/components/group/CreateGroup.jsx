import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const navigate = useNavigate();

  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const groupDetails = {
      chatName,
    };

    console.log(groupDetails);
  };

  return (
    <div className="w-full h-screen bg-zinc-100">
      <div className="w-full h-[10vh] border-b border-zinc-400 px-4 py-4 flex items-center justify-between">
        <i
          onClick={() => navigate("/")}
          className="ri-arrow-left-s-line text-3xl"
        ></i>
        <h1 className="text-3xl font-semibold">New Group</h1>
        <i className="ri-settings-3-line text-3xl"></i>
      </div>

      <div className="w-full md:w-[35%] md:mx-auto mt-10 px-4 py-4">
        <h1 className="mb-5 px-2 py-2 rounded-md bg-orange-400 text-white text-3xl font-semibold w-full text-center">
          Group details
        </h1>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-3 text-xl md:text-base font-medium"
        >
          <input
            onChange={(e) => setChatName(e.target.value)}
            type="text"
            placeholder="Group name"
            className="w-full px-2 py-2 rounded-md outline-none border-border-zinc-400"
          />
          <div className="w-full px-2 rounded-md border-border-zinc-400 bg-white flex items-center">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search . . ."
              className="w-full py-2 outline-none "
            />
            {search ? (
              <i
                onClick={() => setSearch("")}
                className="ri-close-line cursor-pointer"
              ></i>
            ) : (
              ""
            )}
          </div>
          <div className="status w-full flex gap-5 overflow-x-auto overflow-y-hidden">
            <div className="w-fit px-2 py-2 flex flex-col items-center gap-2 rounded-md bg-blue-200">
              <div className="relative w-[16vw] h-[16vw] md:w-[3.5vw] md:h-[3.5vw] border-2 border-zinc-400 rounded-full p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1730724620244-40d6e978acd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>
                <div className="absolute top-0 right-0 w-[6vw] h-[6vw] md:w-[1.2vw] md:h-[1.2vw] text-white rounded-full flex items-center justify-center bg-orange-500">
                  <i className="ri-close-line cursor-pointer"></i>
                </div>
              </div>
              <p className="text-lg md:text-base leading-none md:leading-3">
                Harsh
              </p>
            </div>
            <div className="w-fit px-2 py-2 flex flex-col items-center gap-2 rounded-md bg-blue-200">
              <div className="relative w-[16vw] h-[16vw] md:w-[3.5vw] md:h-[3.5vw] border-2 border-zinc-400 rounded-full p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1730724620244-40d6e978acd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1N3x8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>
                <div className="absolute top-0 right-0 w-[6vw] h-[6vw] md:w-[1.2vw] md:h-[1.2vw] text-white rounded-full flex items-center justify-center bg-orange-500">
                  <i className="ri-close-line cursor-pointer"></i>
                </div>
              </div>
              <p className="text-lg md:text-base leading-none md:leading-3">
                Harsh
              </p>
            </div>
          </div>
          <div className="w-full max-h-[30vh] rounded-md overflow-x-hidden overflow-y-auto">
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
                <h1 className="text-2xl font-medium leading-none">Yogendra</h1>
              </div>
            </div>
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
          </div>
          <button className="w-full px-2 py-2 mt-3 rounded-md outline-none text-white bg-blue-500 hover:bg-blue-600">
            Create group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
