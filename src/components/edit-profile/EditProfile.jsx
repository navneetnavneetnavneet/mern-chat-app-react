import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { asyncEditProfile } from "../../store/actions/userActions";

const EditProfile = () => {
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
    navigate("/");
  };

  return (
    user && (
      <div className="w-full h-screen bg-zinc-100">
        <div className="w-full h-[10vh] border-b border-zinc-400 px-4 py-4 flex items-center justify-between">
          <i
            onClick={() => navigate("/")}
            className="ri-arrow-left-line text-2xl cursor-pointer"
          ></i>
          <h1 className="text-3xl font-semibold">Edit Profile</h1>
          <i className="ri-settings-3-line text-2xl cursor-pointer"></i>
        </div>
        <div className="flex flex-col items-center my-5 gap-2">
          <div className="relative w-[30vw] h-[30vw] md:w-[8vw] md:h-[8vw]">
            <img
              className="w-full h-full object-cover rounded-full"
              src={user.profileImage.url}
              alt=""
            />
            <div
              onClick={() => {
                imageRef.current.click();
              }}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer absolute bottom-0 left-0 bg-zinc-600"
            >
              <i className="ri-pencil-line text-xl text-white"></i>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[35%] md:mx-auto px-4 py-4 rounded-md">
          <h1 className="text-2xl font-semibold">User Details</h1>
          <hr className="w-full h-[1px] bg-zinc-400" />
          <form
            onSubmit={submitHandler}
            className="w-full flex flex-col gap-y-3 mt-5 text-xl font-medium md:text-base"
          >
            <input
              hidden
              ref={imageRef}
              onChange={(e) => setProfileImage(e.target.files[0])}
              type="file"
            />
            <div>
              <label htmlFor="fullname" className=" opacity-80">
                Full name
              </label>
              <input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                type="text"
                placeholder="Enter full name"
                className="w-full px-2 py-2 rounded-md mt-1  bg-zinc-100 border border-zinc-400 outline-none "
              />
            </div>
            <div>
              <label htmlFor="email" className=" opacity-80">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
                className="w-full px-2 py-2 rounded-md mt-1  bg-zinc-100 border border-zinc-400 outline-none "
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
                <span className="text-lg md:text-base opacity-80">Male</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  name="gender"
                  type="radio"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "female"}
                />
                <span className="text-lg md:text-base opacity-80">Female</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  name="gender"
                  type="radio"
                  value="other"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "other"}
                />
                <span className="text-lg md:text-base opacity-80">Other</span>
              </div>
            </div>
            <button className="w-full px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default EditProfile;
