import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Status = ({ user }) => {
  const loggedInUser = useSelector((state) => state.userReducer);

  return (
    user && (
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex-shrink-0 p-[2px] border-2 border-zinc-400">
        <Link
          to={`/status/${user._id}`}
          className="w-full flex h-full rounded-full overflow-hidden"
        >
          <img
            className="w-full h-full object-cover"
            src={user.profileImage.url}
            alt=""
          />
        </Link>
        {loggedInUser && loggedInUser?.user?._id === user?._id ? (
          <Link
            to="/status/upload"
            className="w-[1.5rem] h-[1.5rem] absolute z-[999] bottom-0 md:bottom-1 right-0 translate-x-1/4 translate-y-1/4 flex items-center justify-center rounded-full bg-zinc-100  border-2 border-zinc-600 "
          >
            <i className="ri-add-line text-[1.25rem]"></i>
          </Link>
        ) : (
          ""
        )}
      </div>
    )
  );
};

export default Status;
