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
      <div className="w-full px-4 md:px-8 py-2 border-b border-zinc-400 flex items-center justify-between">
        <i
          onClick={() => navigate("/")}
          className="ri-arrow-left-line text-[1.2rem] cursor-pointer"
        ></i>
        <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold">
          My Profile
        </h1>
        <i
          onClick={() => setWidth(100)}
          className="ri-menu-line text-2xl cursor-pointer"
        ></i>
      </div>
      <div className="w-full px-4 md:px-8 py-10 flex flex-col gap-y-5 items-center justify-center">
        <div className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={user.profileImage?.url}
            alt=""
          />
        </div>
        <div className="">
          <h1 className="text-[1.75rem] md:text-[2rem] font-bold text-center">
            {user.fullName}
          </h1>
          <h1 className="text-[1.25rem] font-medium text-center">
            {user.email}
          </h1>
        </div>
        <div className="flex items-center justify-center gap-10">
          <Link
            to="/edit"
            className="px-4 py-2 flex items-center gap-1 rounded-md bg-blue-600 text-white font-medium"
          >
            <i className="ri-pencil-line text-[1.2rem]"></i>
            <span className="text-[1rem]">Edit Profile</span>
          </Link>
          <div
            onClick={() => dispatch(asyncSignOutUser())}
            className="px-4 py-2 w-fit flex items-center gap-1 rounded-md bg-red-600 cursor-pointer text-white font-medium"
          >
            <i className="ri-logout-box-line text-[1.2rem]"></i>
            <span className="text-[1rem]">Logout</span>
          </div>
        </div>
      </div>
      <div
        style={{ width: `${width}%` }}
        className="absolute md:max-w-[25vw] top-0 right-0 z-[999] duration-300 h-screen border-l border-zinc-400 bg-zinc-100"
      >
        <div className="flex items-center justify-between border-b border-zinc-400 px-4 py-4">
          <i
            onClick={() => setWidth(0)}
            className="ri-close-line text-xl cursor-pointer"
          ></i>
          <i className="ri-menu-line text-xl cursor-pointer"></i>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4"
        >
          <i className="ri-home-line text-lg cursor-pointer"></i>
          <p className="text-base font-medium">Home</p>
        </Link>
        <Link
          to="/profile"
          className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4"
        >
          <i className="ri-user-line text-lg cursor-pointer"></i>
          <p className="text-base font-medium">Profile</p>
        </Link>
        <Link
          to="/edit"
          className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4"
        >
          <i className="ri-pencil-line text-lg cursor-pointer"></i>
          <p className="text-base font-medium">Edit Profile</p>
        </Link>
        <Link
          to="/group-create"
          className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4"
        >
          <i className="ri-edit-box-line text-lg cursor-pointer"></i>
          <p className="text-base font-medium">Create Group</p>
        </Link>
        <Link
          to="/status/upload"
          className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4"
        >
          <i className="ri-add-box-line text-lg cursor-pointer"></i>
          <p className="text-base font-medium">Upload Status</p>
        </Link>
        <div className="flex items-center gap-2 border-b border-zinc-400 px-4 py-4">
          <i className="ri-lock-line text-lg cursor-pointer"></i>
          <p className="text-base font-medium">Privacy & Security</p>
        </div>
        <div
          onClick={() => dispatch(asyncSignOutUser())}
          className="px-4 py-2 mt-4 ml-4 w-fit flex items-center gap-1 rounded-md bg-red-600 cursor-pointer text-white font-medium"
        >
          <i className="ri-logout-box-line text-[1.2rem]"></i>
          <span className="text-[1rem]">Logout</span>
        </div>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ProfilePage;
