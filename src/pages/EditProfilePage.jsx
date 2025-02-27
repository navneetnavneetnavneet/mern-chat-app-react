import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { asyncEditProfile } from "../store/actions/userActions";
import LoadingPage from "./LoadingPage";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [gender, setGender] = useState(user && user.gender);
  const [profileImage, setProfileImage] = useState(
    user ? user.profileImage : ""
  );

  const imageRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !gender) {
      return toast.warning("All fields are require !");
    }

    const userData = {
      fullName,
      email,
      gender,
      profileImage,
    };

    await dispatch(asyncEditProfile(userData));
    navigate("/profile");
  };

  return user ? (
    <div className="w-full h-screen bg-zinc-100">
      <div className="w-full px-4 md:px-8 py-2 border-b border-zinc-400 flex items-center justify-between">
        <i
          onClick={() => navigate("/profile")}
          className="ri-arrow-left-line text-[1.2rem] cursor-pointer"
        ></i>
        <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold">
          Edit Profile
        </h1>
        <i className="ri-settings-3-line text-2xl cursor-pointer"></i>
      </div>
      <div className="flex flex-col items-center my-5 gap-2">
        <div className="relative w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem]">
          <img
            className="w-full h-full object-cover rounded-full"
            src={user.profileImage.url}
            alt=""
          />
          <div
            onClick={() => {
              imageRef.current.click();
            }}
            className="w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center cursor-pointer absolute bottom-0 left-0 bg-zinc-600"
          >
            <i className="ri-pencil-line text-xl text-white"></i>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[50vw] lg:w-[30vw] mx-auto px-4 py-4 rounded-md">
        <h1 className="text-[1.5rem] mb-1 font-semibold">User Details</h1>
        <hr className="w-full h-[1px] md:h-[2px] bg-zinc-400" />
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-y-3 mt-5 font-medium"
        >
          <input
            hidden
            ref={imageRef}
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            type="file"
          />
          <div>
            <label
              htmlFor="fullname"
              className="text-xl md:text-base opacity-80"
            >
              Full name
            </label>
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type="text"
              placeholder="Enter full name"
              className="w-full px-2 py-2 rounded-md bg-zinc-100 border border-zinc-400 outline-none "
            />
          </div>
          <div>
            <label htmlFor="email" className="text-xl md:text-base opacity-80">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
              className="w-full px-2 py-2 rounded-md bg-zinc-100 border border-zinc-400 outline-none "
            />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <input
                name="gender"
                type="radio"
                value="male"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "male"}
              />
              <span className="text-[1.2rem] md:text-[1rem] opacity-80">
                Male
              </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="gender"
                type="radio"
                value="female"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "female"}
              />
              <span className="text-[1.2rem] md:text-[1rem] opacity-80">
                Female
              </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="gender"
                type="radio"
                value="other"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "other"}
              />
              <span className="text-[1.2rem] md:text-[1rem] opacity-80">
                Other
              </span>
            </div>
          </div>
          <button className="w-full px-4 py-2 rounded-md text-white text-base bg-blue-500 hover:bg-blue-600">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default EditProfilePage;
