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
      <div className="w-full h-[10vh] border-b border-zinc-400 px-4 py-4 flex items-center justify-between">
        <i
          onClick={() => navigate("/")}
          className="ri-arrow-left-line text-2xl cursor-pointer"
        ></i>
        <h1 className="text-2xl md:text-3xl font-semibold">My Profile</h1>
        <i className="ri-settings-3-line text-2xl cursor-pointer"></i>
      </div>
      <div className="w-full px-4 py-10 flex flex-col gap-y-5 items-center justify-center">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={user.profileImage?.url}
            alt=""
          />
        </div>
        <div className="">
          <h1 className="text-3xl font-medium text-center">{user.fullName}</h1>
          <h1 className="text-xl font-medium text-center">{user.email}</h1>
        </div>
        <div className="flex items-center justify-center gap-10">
          <Link
            to="/edit"
            className="px-4 py-2 flex items-center gap-1 rounded-md bg-blue-600 text-white font-medium"
          >
            <i className="ri-pencil-line text-base"></i>
            <span className="text-base">Edit Profile</span>
          </Link>
          <div
            onClick={() => dispatch(asyncSignOutUser())}
            className="px-4 py-2 w-fit flex items-center gap-1 rounded-md bg-red-600 cursor-pointer text-white font-medium"
          >
            <i className="ri-logout-box-line text-base"></i>
            <span className="text-base">Logout</span>
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
