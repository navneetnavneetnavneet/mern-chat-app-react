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
  const [dateOfBirth, setDateOfBirth] = useState(user && user.dateOfBirth);
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
      dateOfBirth,
      profileImage,
    };

    await dispatch(asyncEditProfile(userData));
    navigate("/profile");
  };

  return user ? (
    <div className="w-full h-screen bg-zinc-100">
      <div className="w-full h-[10vh] px-2 md:px-4 flex items-center justify-between border-b border-zinc-400">
        <i
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line text-[1.25rem] cursor-pointer"
        ></i>
        <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tighter">
          Edit Profile
        </h1>
        <i className="ri-settings-3-line text-[1.25rem] cursor-pointer"></i>
      </div>
      <div className="flex flex-col items-center pt-10 gap-2">
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
            className="w-[2.5rem] h-[2.5rem] absolute -bottom-2 md:bottom-0 left-0 rounded-full flex items-center justify-center cursor-pointer bg-zinc-600"
          >
            <i className="ri-pencil-line text-[1.25rem] text-white"></i>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[40vw] lg:w-[30vw] mx-auto px-2 md:px-4 pt-5 rounded-md">
        <h1 className="text-[1.5rem] md:text-[1.75rem] font-semibold tracking-tighter">
          User Details
        </h1>
        <hr className="w-full h-[1px] md:h-[2px] bg-zinc-400" />
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-y-5 pt-5 tracking-tighter font-medium"
        >
          <input
            hidden
            ref={imageRef}
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            type="file"
          />
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            placeholder="Enter full name"
            className="w-full px-2 py-2 rounded-md bg-zinc-100 border border-zinc-400 outline-none "
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter email"
            className="w-full px-2 py-2 rounded-md bg-zinc-100 border border-zinc-400 outline-none "
          />
          <input
            onChange={(e) => setDateOfBirth(e.target.value)}
            value={new Date(dateOfBirth).toISOString().split("T")[0]}
            type="date"
            placeholder="Enter Date of Birth (DOB)"
            className="w-full px-2 py-2 rounded-md bg-zinc-100 border border-zinc-400 outline-none "
          />
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <input
                name="gender"
                type="radio"
                value="male"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "male"}
              />
              <span className="text-base opacity-80">Male</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="gender"
                type="radio"
                value="female"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "female"}
              />
              <span className="text-base opacity-80">Female</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="gender"
                type="radio"
                value="other"
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "other"}
              />
              <span className="text-base opacity-80">Other</span>
            </div>
          </div>
          <button className="w-full px-2 py-2 rounded-md text-white text-base bg-blue-500 hover:bg-blue-600">
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
