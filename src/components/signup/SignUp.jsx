import React, { useState } from "react";
import { Link } from "react-router-dom";
import background from "/background.jpg";
import logo from "/chatlogo.png";
import { useDispatch } from "react-redux";
import { asyncSignUpUser } from "../../store/actions/userActions";

const SignUp = () => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [show, setShow] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      fullName,
      email,
      password,
      gender,
    };

    dispatch(asyncSignUpUser(userData));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-screen flex items-center justify-center bg-zinc-100 px-4 py-4"
    >
      <div className="w-full md:w-[35%] px-10 py-5 rounded-md bg-white">
        <div className="flex flex-col items-center">
          <div className="w-[16vw] h-[16vw] md:w-[5vw] md:h-[5vw]">
            <img className="w-full h-full object-cover" src={logo} alt="" />
          </div>
          <h1 className="text-2xl font-bold">
            Welcome to <span className="text-blue-600">Chat</span>
            <span className="text-orange-600">X</span>
          </h1>
          <h4 className="text-center mt-3 text-base font-medium leading-none opacity-50">
            Register to create your first account and start exploring the chat
            in ChatX.
          </h4>
        </div>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-y-3 mt-5 text-xl font-medium md:text-base"
        >
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
          <div>
            <label htmlFor="password" className=" opacity-80">
              Password
            </label>
            <div className="w-full flex items-center justify-between rounded-md mt-1 bg-zinc-100 border border-zinc-400">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type={show ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-2 py-2 rounded-md border-none bg-zinc-100 border-zinc-400 outline-none "
              />
              {!show ? (
                <i
                  onClick={() => setShow(!show)}
                  className="ri-eye-off-line mr-2 cursor-pointer"
                ></i>
              ) : (
                <i
                  onClick={() => setShow(!show)}
                  className="ri-eye-line mr-2 cursor-pointer"
                ></i>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="confirm password" className=" opacity-80">
              Confirm password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              placeholder="Enter confirm password"
              className="w-full px-2 py-2 rounded-md mt-1 bg-zinc-100 border border-zinc-400 outline-none "
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
            Sign Up
          </button>
        </form>
        <p className="w-full text-center my-3 text-lg md:text-sm font-medium">
          Aleady have an account ?{" "}
          <Link to="/signin" className="text-blue-600">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
