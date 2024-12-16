import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Status = ({ user }) => {
  const loggedInUser = useSelector((state) => state.userReducer);

  return (
    user && (
      <div className="relative w-[12vw] h-[12vw] md:w-[3.5vw] md:h-[3.5vw] rounded-full flex-shrink-0 p-[2px] border-2 border-zinc-400">
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
            className="w-[6vw] h-[6vw] md:w-[1.5vw] md:h-[1.5vw] border-2 border-zinc-600 flex items-center justify-center absolute z-[100] bottom-0 right-0 translate-x-1/4 translate-y-1/4 rounded-full bg-zinc-200"
          >
            <i className="ri-add-line text-[1.4rem] font-semibold md:font-normal"></i>
          </Link>
        ) : (
          ""
        )}
      </div>
    )
  );
};

export default Status;
