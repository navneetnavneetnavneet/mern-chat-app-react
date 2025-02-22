import axios from "../../utils/axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  asyncAddUserToGroup,
  asyncExitUserFromGroup,
  asyncRemoveUserFromGroup,
  asyncRenameGroup,
} from "../../store/actions/chatActions";
import { useNavigate } from "react-router-dom";

const UpdateChatPopup = ({ selectedChat, hidden, setHidden, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleAddUser = async (u) => {
    if (selectedChat.groupAdmin._id !== user._id) {
      return toast.warning("Only admin can add users !");
    }

    if (u) {
      if (selectedChat.users.find((su) => su._id === u._id)) {
        return toast.warning("User already existed in group !");
      }

      await dispatch(asyncAddUserToGroup(selectedChat._id, u._id));
      toast.success(`User added in ${selectedChat.chatName} group`);
    }
  };

  const handleRemoveUser = async (u) => {
    if (selectedChat.groupAdmin._id !== user._id) {
      return toast.warning("Only admin can remove users !");
    }

    await dispatch(asyncRemoveUserFromGroup(selectedChat._id, u._id));
    toast.success(`User removed from ${selectedChat.chatName} group`);
  };

  const handleExitUser = async () => {
    if (user) {
      await dispatch(asyncExitUserFromGroup(selectedChat._id));
      toast.success(`User exit from ${selectedChat.chatName} group`);
      navigate("/");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!chatName) {
      return toast.warning("Please enter group name !");
    }

    await dispatch(asyncRenameGroup(selectedChat._id, chatName));
    setChatName("");
  };

  return (
    selectedChat && (
      <div
        className={`w-full h-screen px-4 sm:px-8 py-4 absolute z-[999] text-black top-0 left-0 bg-[#0000007a] ${
          hidden ? "hidden" : "flex"
        } items-center justify-center`}
      >
        <div className="w-full md:w-[50vw] lg:w-[30vw] mx-auto bg-zinc-100 rounded-md">
          <div className="w-full mb-2 font-medium flex flex-col gap-3 px-4 py-4">
            <i
              onClick={() => setHidden(!hidden)}
              className="ri-close-line text-[1.25rem] md:text-[1.5rem] cursor-pointer w-full text-end"
            ></i>
            <h1 className="mb-5 md:mb-2 px-2 py-2 rounded-md bg-orange-400 text-white text-[1.25rem] md:text-[1.5rem] font-bold w-full text-center">
              {selectedChat.chatName}
            </h1>
            <div className="status w-full flex gap-5 overflow-x-auto overflow-y-hidden">
              {selectedChat.users.length > 0 ? (
                selectedChat.users.map((u) => (
                  <div
                    key={u._id}
                    className={`${
                      u._id === selectedChat.groupAdmin._id
                        ? "bg-green-200"
                        : "bg-blue-200"
                    } w-20 py-4 flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-md`}
                  >
                    <div className="relative w-14 h-14 md:w-16 md:h-16 border-2 border-zinc-400 rounded-full p-[2px]">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img
                          className="w-full h-full object-cover"
                          src={u.profileImage?.url}
                          alt=""
                        />
                      </div>
                      <div
                        onClick={() => handleRemoveUser(u)}
                        className="absolute top-0 -right-2 w-[1.5rem] h-[1.5rem] cursor-pointer text-white rounded-full flex items-center justify-center bg-orange-500"
                      >
                        <i className="ri-close-line cursor-pointer text-[1.2rem]"></i>
                      </div>
                    </div>
                    <p className="text-[1rem] md:text-base leading-none md:leading-3">
                      {u.fullName?.split(" ")[0]}
                    </p>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <form onSubmit={submitHandler} className="w-full flex gap-2">
              <input
                onChange={(e) => setChatName(e.target.value)}
                value={chatName}
                type="text"
                placeholder="Group name"
                className="w-full px-2 py-2 rounded-md text-black text-base outline-none border border-zinc-400"
              />
              <button className="px-2 py-2 rounded-md text-base outline-none text-white bg-green-700 hover:bg-green-800">
                Update
              </button>
            </form>
            <div className="w-full px-2 rounded-md border border-zinc-400 bg-white flex items-center gap-2">
              <i className="ri-search-line text-[1.2rem]"></i>
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="Search . . ."
                className="w-full py-2 text-base outline-none text-black"
              />
              {search ? (
                <i
                  onClick={() => setSearch("")}
                  className="ri-close-line cursor-pointer text-[1.2rem]"
                ></i>
              ) : (
                ""
              )}
            </div>
            <div className="w-full max-h-[20vh] rounded-md overflow-x-hidden overflow-y-auto">
              {!loading ? (
                users.length > 0 &&
                users.map((user) => (
                  <div
                    onClick={() => handleAddUser(user)}
                    key={user._id}
                    className="user w-full px-4 py-2 flex items-center gap-2 border-b border-zinc-400"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={user.profileImage?.url}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col">
                      <h1 className="text-[1.25rem] md:text-[1.5rem] font-medium leading-none">
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
            <button
              onClick={handleExitUser}
              className="px-2 py-2 rounded-md outline-none text-white text-base font-medium bg-red-500 hover:bg-red-600"
            >
              Exit group
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdateChatPopup;
