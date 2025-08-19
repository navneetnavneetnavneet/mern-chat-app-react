import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { asyncCreateGroup } from "../store/actions/chatActions";
import LoadingPage from "./LoadingPage";
import useSearchResults from "../hooks/useSearchResults";

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [slectedUsers, setSelectedUsers] = useState([]);
  const [chatName, setChatName] = useState("");
  const [search, setSearch] = useState("");

  const { users, loading } = useSearchResults(search);

  const { user } = useSelector((state) => state.userReducer);

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

  return user ? (
    <div className="w-full h-screen bg-zinc-100">
      <div className="w-full h-[10vh] px-2 md:px-4 flex items-center justify-between border-b border-zinc-400">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-[1.25rem] cursor-pointer"
        ></i>
        <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tighter">
          New Group
        </h1>
        <i className="ri-settings-3-line text-[1.25rem] cursor-pointer"></i>
      </div>

      <div className="w-full md:w-[40vw] lg:w-[30vw] mx-auto pt-10 px-2 md:px-4">
        <h1 className="py-2 md:py-0 rounded-md bg-orange-400 text-white text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tighter w-full text-center">
          Group Details
        </h1>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-3 font-medium tracking-tighter pt-5"
        >
          <input
            onChange={(e) => setChatName(e.target.value)}
            value={chatName}
            type="text"
            placeholder="Enter Group Name"
            className="w-full px-2 py-2 bg-transparent rounded-md outline-none border border-zinc-400 text-base"
          />
          <div className="w-full px-2 rounded-md border border-zinc-400 flex items-center gap-2 ">
            <i className="ri-search-line text-[1.25rem] cursor-pointer"></i>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search . . ."
              className="w-full py-2 bg-transparent outline-0 border-none text-base"
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
          <div className="status w-full flex gap-5 overflow-x-auto overflow-y-hidden">
            {slectedUsers.length > 0 ? (
              slectedUsers.map((u) => (
                <div
                  key={u._id}
                  className="w-20 py-2 flex-shrink-0 flex flex-col items-center justify-center gap-2 rounded-md bg-blue-200"
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
                      className="absolute top-0 -right-2 w-[1.6rem] h-[1.6rem] cursor-pointer text-white rounded-full flex items-center justify-center bg-orange-500"
                    >
                      <i className="ri-close-line text-[1.25rem] cursor-pointer"></i>
                    </div>
                  </div>
                  <p className="text-[1rem] leading-none md:leading-3 tracking-tighter">
                    {u.fullName?.split(" ")[0]}
                  </p>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="w-full max-h-[30vh] overflow-x-hidden overflow-y-auto">
            {!loading ? (
              users.length > 0 &&
              users.map((user) => (
                <div
                  onClick={() => handleAddUser(user)}
                  key={user._id}
                  className="relative w-full h-[10vh] hover:bg-zinc-200 duration-300 flex items-center gap-2 md:gap-3 border-b border-zinc-400 cursor-pointer"
                >
                  <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={user.profileImage?.url}
                      alt=""
                    />
                  </div>
                  <h1 className="text-[1.25rem] md:text-[1.5rem] font-medium tracking-tighter">
                    {user.fullName}
                  </h1>
                  {slectedUsers.includes(user) && (
                    <div className="absolute right-4 w-[1.5rem] h-[1.5rem] text-white rounded-full flex items-center justify-center bg-zinc-500 cursor-pointer">
                      <i className="ri-check-fill text-[1.25rem] font-medium"></i>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <h1 className="text-[1rem] w-full opacity-50 text-center py-5 tracking-tighter">
                Please wait . . .
              </h1>
            )}
          </div>
          <button className="w-full px-2 py-2 rounded-md outline-none text-white text-base bg-blue-500 hover:bg-blue-600">
            Create group
          </button>
        </form>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default CreateGroupPage;
