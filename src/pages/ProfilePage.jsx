import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncSignOutUser } from "../store/actions/userActions";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  return user ? (
    <div className="w-full h-screen bg-zinc-100">
      <div className="w-full px-4 md:px-8 py-2 border-b border-zinc-400 flex items-center justify-between">
        <i
          onClick={() => navigate("/")}
          className="ri-arrow-left-line text-[1.2rem] cursor-pointer"
        ></i>
        <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold">
          My Profile
        </h1>
        <i className="ri-settings-3-line text-2xl cursor-pointer"></i>
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
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <h1 className="text-2xl font-medium opacity-50">Loading . . .</h1>
    </div>
  );
};

export default ProfilePage;
