import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import {
  asyncAddUserToGroup,
  asyncExitUserFromGroup,
  asyncRemoveUserFromGroup,
  asyncRenameGroup,
} from "../store/actions/chatActions";

const UpdateGroupDetailsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedChat } = useSelector((state) => state.chatReducer);
  const { user } = useSelector((state) => state.userReducer);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatName, setChatName] = useState("");

  const fetchSearchResults = async () => {
    if (!search) {
      return;
    }
    setLoading(true);
    try {
      const { data, status } = await axios.get(
        `/users/alluser?search=${search}`
      );

      if (data && status === 200) {
        setUsers(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    fetchSearchResults();

    return () => {
      setUsers([]);
    };
  }, [search]);

  const handleAddUser = async (u) => {
    if (selectedChat.groupAdmin._id !== user?._id) {
      return toast.warning("Only admin can add users !");
    }

    if (u) {
      if (
        selectedChat.users.find((selectedUser) => selectedUser._id === u._id)
      ) {
        return toast.warning("User already existed in group !");
      }

      await dispatch(asyncAddUserToGroup(selectedChat._id, u?._id));
      toast.success(`User added in ${selectedChat.chatName} group`);
    }
  };

  const handleRemoveUser = async (u) => {
    if (selectedChat.groupAdmin._id !== user?._id) {
      return toast.warning("Only admin can remove users !");
    }

    await dispatch(asyncRemoveUserFromGroup(selectedChat._id, u?._id));
    toast.success(`User remove from ${selectedChat.chatName} group`);
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

    await dispatch(asyncRenameGroup(selectedChat?._id, chatName));
    await navigate(-1);
    toast.success("Group name is updated");
    setChatName("");
  };

  return (
    selectedChat && (
      <div className="absolute top-0 left-0 z-[999] w-full h-screen px-2 flex items-center justify-center bg-zinc-800">
        <div className="w-full md:w-[40vw] lg:w-[30vw] mx-auto py-2 pb-4 bg-white rounded-md">
          <div className="w-full flex flex-col gap-3 px-2 md:px-4">
            <i
              onClick={() => navigate(-1)}
              className="ri-close-line text-[1.5rem] -mb-3 cursor-pointer text-end"
            ></i>
            <h1 className="py-2 md:py-0 rounded-md bg-orange-400 text-white text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tighter w-full text-center">
              {selectedChat.chatName}
            </h1>
            <div className="w-full flex gap-5 overflow-x-auto overflow-y-hidden">
              {selectedChat.users.length > 0
                ? selectedChat.users.map((u) => (
                    <div
                      key={u._id}
                      className={`${
                        u._id === selectedChat.groupAdmin._id
                          ? "bg-green-300"
                          : "bg-blue-300"
                      } w-20 py-2 flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-md`}
                    >
                      <div className="relative w-14 md:w-16 h-14 md:h-16 rounded-full border-2 border-zinc-400 p-[2px]">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={u.profileImage.url}
                            alt=""
                          />
                        </div>
                        <div
                          onClick={() => handleRemoveUser(u)}
                          className="absolute top-0 -right-2 w-[1.6rem] h-[1.6rem] cursor-pointer text-white rounded-full flex items-center justify-center bg-orange-500"
                        >
                          <i className="ri-close-line text-[1.25rem] cursor-pointer"></i>
                        </div>
                      </div>
                      <h4 className="text-[1rem] leading-none md:leading-3 tracking-tighter font-medium">
                        {u.fullName.split(" ")[0]}
                      </h4>
                    </div>
                  ))
                : ""}
            </div>
            <form
              onSubmit={submitHandler}
              className="w-full flex gap-2 font-medium tracking-tighter"
            >
              <input
                onChange={(e) => setChatName(e.target.value)}
                value={chatName}
                type="text"
                placeholder="Enter Group Name"
                className="w-full px-2 py-2 rounded-md text-black text-base outline-none border border-zinc-400"
              />
              <button className="px-2 py-2 rounded-md text-base outline-none text-white bg-blue-500 hover:bg-blue-600">
                Update
              </button>
            </form>
            <div className="w-full px-2 rounded-md border border-zinc-400 flex items-center gap-2">
              <i className="ri-search-line text-[1.25rem] cursor-pointer"></i>
              <input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="Search . . ."
                className="w-full py-2 outline-none border-none text-base"
              />
              {search ? (
                <i
                  onClick={() => setSearch("")}
                  className="ri-close-line text-[1.25rem] cursor-pointer"
                ></i>
              ) : (
                ""
              )}
            </div>
            <div className="w-full max-h-[30vh] overflow-x-hidden overflow-y-auto">
              {!loading ? (
                users.length > 0 &&
                users.map((user) => (
                  <div
                    onClick={() => handleAddUser(user)}
                    key={user._id}
                    className="w-full h-[10vh] hover:bg-zinc-200 duration-300 flex items-center gap-2 border-b border-zinc-400 cursor-pointer"
                  >
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={user.profileImage?.url}
                        alt=""
                      />
                    </div>
                    <h1 className="text-[1.25rem] md:text-[1.5rem] font-medium tracking-tighter">
                      {user.fullName}
                    </h1>
                  </div>
                ))
              ) : (
                <h1 className="text-base font-medium opacity-50 w-full text-center py-5 tracking-tighter">
                  Please wait . . .
                </h1>
              )}
            </div>
            <button
              onClick={handleExitUser}
              className="px-2 py-2 rounded-md outline-none text-white text-base font-medium tracking-tighter bg-red-500 hover:bg-red-600"
            >
              Exit Group
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdateGroupDetailsPage;
