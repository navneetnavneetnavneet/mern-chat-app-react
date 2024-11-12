import React, { useState } from "react";
import { Link } from "react-router-dom";
import background from "/background.jpg";
import logo from "/chatlogo.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };
    console.log(user);
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
            Welcome back to <span className="text-blue-600">Chat</span>
            <span className="text-orange-600">X</span>
          </h1>
          <h4 className="text-center mt-3 text-base font-medium leading-none opacity-50">
            Please enter your details to sign in.
          </h4>
        </div>
        <form
          onSubmit={submitHandler}
          className="w-full flex flex-col gap-y-3 mt-5 text-xl font-medium md:text-base"
        >
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
            <Link className="w-full inline-block text-end mt-1 text-blue-600 text-sm">Forger Password ?</Link>
          </div>
          <button className="w-full px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600">
            Sign In
          </button>
        </form>
        <p className="w-full text-center my-3 text-lg md:text-sm font-medium">
          Don't have an account ?{" "}
          <Link to="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
