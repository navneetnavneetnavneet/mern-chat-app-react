import { useState } from "react";
import TopNav from "./TopNav";
import Status from "./Status";
import { Link } from "react-router-dom";
import Chats from "./Chats";
import User from "./User";
import { useSelector } from "react-redux";
import useSearchResults from "../../hooks/useSearchResults";

const SideNav = () => {
  const [search, setSearch] = useState("");

  const { users, loading } = useSearchResults(search);

  const { user } = useSelector((state) => state.userReducer);
  const { allStatus } = useSelector((state) => state.statusReducer);

  return (
    <div className="relative border-r border-zinc-400 w-full sm:w-[50vw] md:w-[40vw] lg:w-[30vw] h-full">
      <TopNav />
      <div className="relative w-full h-[10vh] px-2 md:px-4 flex flex-col justify-center">
        <div className="w-full flex items-center gap-2 rounded-md border border-zinc-400 px-2 text-lg font-medium">
          <i className="ri-search-line text-[1.25rem]"></i>
          <input
            id="searchInput"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search . . ."
            className="w-full py-2 bg-transparent outline-0 border-none"
          />
          {search ? (
            <i
              onClick={() => setSearch("")}
              className="ri-close-line text-[1.25rem]"
            ></i>
          ) : (
            <></>
          )}
        </div>
        <div
          className={`${
            users.length > 0 ? "h-[80vh]" : ""
          } absolute left-0 top-[100%] z-[9999] w-full bg-zinc-100 overflow-x-hidden overflow-y-auto`}
        >
          {!loading ? (
            users.length > 0 &&
            users.map((user) => <User key={user._id} user={user} />)
          ) : (
            <h1 className="text-base font-medium opacity-50 w-full text-center py-5">
              Please wait . . .
            </h1>
          )}
        </div>
      </div>
      <div className="status w-full h-[10vh] px-2 md:px-4 flex items-center gap-2 md:gap-3 border-b border-zinc-400 overflow-x-auto overflow-y-hidden">
        {user?.status?.length === 0 ? <Status user={user} /> : ""}
        {allStatus.length > 0 &&
          allStatus.map((status) => (
            <Status key={status._id} user={status.user} />
          ))}
      </div>
      <Chats />
      <Link
        to="/create-group"
        className="absolute bottom-2 md:bottom-4 right-2 md:right-4 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-zinc-600 text-white"
      >
        <i className="ri-add-line text-[1.5rem] md:text-[2rem]"></i>
      </Link>
    </div>
  );
};

export default SideNav;
