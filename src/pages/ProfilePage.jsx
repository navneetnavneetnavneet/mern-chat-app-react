import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncSignOutUser } from "../store/actions/userActions";
import LoadingPage from "./LoadingPage";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  const [width, setWidth] = useState(0);

  return user ? (
    <div className="relative w-full h-screen bg-zinc-100 overflow-hidden">
      <div className="w-full h-[10vh] px-2 md:px-4 flex items-center justify-between border-b border-zinc-400">
        <i
          onClick={() => navigate("/")}
          className="ri-arrow-left-line text-[1.25rem] cursor-pointer"
        ></i>
        <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tighter">
          My Profile
        </h1>
        <i
          onClick={() => setWidth(100)}
          className="ri-menu-line text-[1.25rem] cursor-pointer"
        ></i>
      </div>
      <div className="w-full px-2 md:px-4 py-10 flex flex-col gap-y-5 items-center justify-center">
        <div className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={user.profileImage?.url}
            alt=""
          />
        </div>
        <div className="">
          <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tighter text-center leading-none">
            {user.fullName}
          </h1>
          <h4 className="text-[1rem] md:text-[1.25rem] font-medium tracking-tighter text-center opacity-80">
            {user.email}
          </h4>
        </div>
        <div className="flex items-center justify-center gap-5 md:gap-10">
          <Link
            to="/profile/edit"
            className="px-4 py-2 flex items-center gap-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
          >
            <i className="ri-pencil-line text-[1.25rem]"></i>
            <span className="text-[1rem] tracking-tighter">Edit Profile</span>
          </Link>
          <div
            onClick={() => dispatch(asyncSignOutUser())}
            className="px-4 py-2 w-fit flex items-center gap-1 rounded-md bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium"
          >
            <i className="ri-logout-box-line text-[1.25rem]"></i>
            <span className="text-[1rem] tracking-tighter">Logout</span>
          </div>
        </div>
      </div>
      <div
        style={{ width: `${width}%` }}
        className="absolute sm:max-w-[30vw] md:max-w-[25vw] top-0 right-0 z-[999] duration-300 h-screen border-l border-zinc-400 bg-zinc-100"
      >
        <div className="w-full h-[10vh] px-2 md:px-4 flex items-center justify-between border-b border-zinc-400">
          <i
            onClick={() => setWidth(0)}
            className="ri-close-line text-[1.25rem] cursor-pointer"
          ></i>
          <i className="ri-menu-line text-[1.25rem] cursor-pointer"></i>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 border-b border-zinc-400 px-2 md:px-4 py-4 hover:bg-zinc-200 duration-300"
        >
          <i className="ri-home-line text-[1.25rem] cursor-pointer"></i>
          <p className="text-lg font-medium tracking-tighter">Home</p>
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-2 border-b border-zinc-400 px-2 md:px-4 py-4 hover:bg-zinc-200 duration-300"
        >
          <i className="ri-user-line text-[1.25rem] cursor-pointer"></i>
          <p className="text-lg font-medium tracking-tighter">Profile</p>
        </Link>
        <Link
          to="/profile/edit"
          className="flex items-center gap-2 border-b border-zinc-400 px-2 md:px-4 py-4 hover:bg-zinc-200 duration-300"
        >
          <i className="ri-pencil-line text-[1.25rem] cursor-pointer"></i>
          <p className="text-lg font-medium tracking-tighter">Edit Profile</p>
        </Link>
        <Link
          to="/create-group"
          className="flex items-center gap-2 border-b border-zinc-400 px-2 md:px-4 py-4 hover:bg-zinc-200 duration-300"
        >
          <i className="ri-edit-box-line text-[1.25rem] cursor-pointer"></i>
          <p className="text-lg font-medium tracking-tighter">Create Group</p>
        </Link>
        <Link
          to="/status/upload"
          className="flex items-center gap-2 border-b border-zinc-400 px-2 md:px-4 py-4 hover:bg-zinc-200 duration-300"
        >
          <i className="ri-add-box-line text-[1.25rem] cursor-pointer"></i>
          <p className="text-lg font-medium tracking-tighter">Upload Status</p>
        </Link>
        <div className="flex items-center gap-2 border-b border-zinc-400 px-2 md:px-4 py-4 hover:bg-zinc-200 duration-300">
          <i className="ri-lock-line text-[1.25rem] cursor-pointer"></i>
          <p className="text-lg font-medium tracking-tighter">
            Privacy & Security
          </p>
        </div>
        <div
          onClick={() => dispatch(asyncSignOutUser())}
          className="px-4 py-2 mt-4 ml-2 md:ml-4 w-fit flex items-center gap-1 rounded-md bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium"
        >
          <i className="ri-logout-box-line text-[1.25rem]"></i>
          <span className="text-[1rem] tracking-tighter">Logout</span>
        </div>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ProfilePage;
