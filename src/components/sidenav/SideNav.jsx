import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import Status from "./Status";
import { Link } from "react-router-dom";
import Chats from "./Chats";
import User from "./User";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";

const SideNav = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.userReducer);
  const { allStatus } = useSelector((state) => state.statusReducer);

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

  console.log(users);

  return (
    <div className="relative border-r border-zinc-400 w-full sm:w-[50vw] md:w-[40vw] lg:w-[30vw] h-full bg-zinc-100">
      <TopNav />
      <div className="relative w-full px-4 my-2">
        <div className="w-full flex items-center rounded-md border border-zinc-400 px-2 text-xl font-medium">
          <i className="ri-search-line mr-2"></i>
          <input
            id="searchInput"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search . . ."
            className="w-full py-2 bg-transparent outline-none border-none"
          />
          {search ? (
            <i onClick={() => setSearch("")} className="ri-close-line"></i>
          ) : (
            <></>
          )}
        </div>
        <div
          className={`${
            users.length > 0 ? "h-[70vh]" : ""
          } absolute left-0 top-[120%] z-[1000] w-full rounded-md bg-zinc-100 overflow-x-hidden overflow-y-auto`}
        >
          {!loading ? (
            users.length > 0 &&
            users.map((user) => <User key={user._id} user={user} />)
          ) : (
            <h1 className="text-[1rem] font-medium opacity-50 w-full text-center py-5">
              Please wait . . .
            </h1>
          )}
        </div>
      </div>
      <div className="status w-full px-4 py-2 flex items-center gap-3 border-b border-zinc-400 overflow-x-auto overflow-y-hidden">
        {user?.status?.length === 0 ? <Status user={user} /> : ""}
        {allStatus.length > 0 &&
          allStatus.map((status) => (
            <Status key={status._id} user={status.user} />
          ))}
      </div>
      <Chats />
      <Link
        to="/group-create"
        className="absolute bottom-4 right-4 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-zinc-600 text-white"
      >
        <i className="ri-add-line text-[1.5rem] md:text-[2rem]"></i>
      </Link>
    </div>
  );
};

export default SideNav;
