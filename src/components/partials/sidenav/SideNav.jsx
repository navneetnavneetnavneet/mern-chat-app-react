import React, { useEffect, useState } from "react";
import TopNav from "./TopNav";
import Status from "./Status";
import { Link } from "react-router-dom";
import Chats from "./Chats";
import User from "./User";
import axios from "../../../utils/axios";
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

  // console.log(users);

  return (
    <div className="relative w-full md:w-[25%] h-full bg-zinc-100">
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
        <div className="absolute left-0 top-[120%] z-[1000] w-full max-h-[50vh] rounded-md bg-zinc-100 overflow-x-hidden overflow-y-auto">
          {!loading ? (
            users.length > 0 &&
            users.map((user) => <User key={user._id} user={user} />)
          ) : (
            <h1 className="text-xl w-full text-center py-5">
              Please wait . . .
            </h1>
          )}
        </div>
      </div>
      <div className="status w-full h-[10vh] px-4 py-4 flex items-center gap-2 border-b border-zinc-400 overflow-x-auto overflow-y-hidden">
        {user?.status?.length === 0 ? <Status user={user} /> : ""}
        {allStatus.length > 0 &&
          allStatus.map((status) => (
            <Status key={status._id} user={status.user} />
          ))}
        <Status />
      </div>
      <Chats />
      <Link
        to="/group-create"
        className="absolute bottom-4 right-4 w-[12vw] h-[12vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full flex items-center justify-center bg-zinc-600 text-white"
      >
        <i className="ri-add-line text-2xl"></i>
      </Link>
    </div>
  );
};

export default SideNav;
