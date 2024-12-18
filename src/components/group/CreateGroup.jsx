import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { asyncCreateGroup } from "../../store/actions/chatActions";

const CreateGroup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slectedUsers, setSelectedUsers] = useState([]);

  const fetchSearchResults = async () => {
    if (!search) {
      return;
    }
    setLoading(true);

    try {
      const { data } = await axios.get(`/users/alluser?search=${search}`);
      if (data) {
        setUsers(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    fetchSearchResults();

    return () => setUsers([]);
  }, [search]);

  const handleAddUser = (user) => {
    if (slectedUsers.includes(user)) {
      return toast.warning("User already added !");
    }

    setSelectedUsers([...slectedUsers, user]);
  };

  const handleRemoveUser = (u) => {
    setSelectedUsers(
      slectedUsers && slectedUsers.filter((selected) => selected._id !== u._id)
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!chatName) {
      return toast.warning("Please enter group name !");
    }

    if (slectedUsers.length < 2) {
      return toast.warning("More than two users are required in group !");
    }

    const groupDetails = {
      chatName,
      users: JSON.stringify(slectedUsers.map((user) => user._id)),
    };

    dispatch(asyncCreateGroup(groupDetails));
    navigate("/");
    setChatName("");
  };

  return (
    <div className="w-full h-screen bg-zinc-100">
      <div className="w-full h-[10vh] border-b border-zinc-400 px-4 py-4 flex items-center justify-between">
        <i
          onClick={() => navigate("/")}
          className="ri-arrow-left-s-line text-3xl cursor-pointer"
        ></i>
        <h1 className="text-3xl md:text-2xl font-semibold">New Group</h1>
        <i className="ri-settings-3-line text-3xl"></i>
      </div>

      <div className="w-full md:w-[35%] md:mx-auto mt-10 px-4 py-4">
        <h1 className="mb-5 md:mb-2 px-2 py-2 rounded-md bg-orange-400 text-white text-3xl md:text-2xl font-semibold w-full text-center">
          Group details
        </h1>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-3 text-xl md:text-base font-medium"
        >
          <input
            onChange={(e) => setChatName(e.target.value)}
            value={chatName}
            type="text"
            placeholder="Group name"
            className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400"
          />
          <div className="w-full px-2 rounded-md border border-zinc-400 bg-white flex items-center">
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
            {slectedUsers.length > 0 ? (
              slectedUsers.map((u) => (
                <div
                  key={u._id}
                  className="w-fit px-2 py-2 flex flex-col items-center gap-2 rounded-md bg-blue-200"
                >
                  <div className="relative w-[16vw] h-[16vw] md:w-[3.5vw] md:h-[3.5vw] border-2 border-zinc-400 rounded-full p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={u.profileImage?.url}
                        alt=""
                      />
                    </div>
                    <div
                      onClick={() => handleRemoveUser(u)}
                      className="absolute top-0 right-0 w-[6vw] h-[6vw] md:w-[1.2vw] md:h-[1.2vw] text-white rounded-full flex items-center justify-center bg-orange-500"
                    >
                      <i className="ri-close-line cursor-pointer"></i>
                    </div>
                  </div>
                  <p className="text-lg md:text-base leading-none md:leading-3">
                    {u.fullName?.split(" ")[0]}
                  </p>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="w-full max-h-[20vh] rounded-md overflow-x-hidden overflow-y-auto">
            {!loading ? (
              users.length > 0 &&
              users.map((user) => (
                <div
                  onClick={() => handleAddUser(user)}
                  key={user._id}
                  className="user w-full h-[10vh] px-4 py-4 flex items-center gap-2 border-b border-zinc-400"
                >
                  <div className="w-[16vw] h-[16vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={user.profileImage?.url}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-medium leading-none">
                      {user.fullName}
                    </h1>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-xl w-full text-center py-5">
                Please wait . . .
              </h1>
            )}
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
