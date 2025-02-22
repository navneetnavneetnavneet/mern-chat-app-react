import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncForgotPassword } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.warning("Email is required !");
    }

    const data = await dispatch(asyncForgotPassword(email));
    if (!data) {
      return;
    }
    navigate(`/reset-password/${data.resetToken}`);
    toast.success("Email sent successfully !");

    setEmail("");
  };

  return (
    <div className="relative w-full h-screen bg-zinc-100 py-4 px-4">
      <div className="md:w-[50vw] lg:w-[30vw] mx-auto flex flex-col items-center gap-5">
        <div className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] mt-5 rounded-full border-2 flex items-center justify-center">
          <i className="text-[3rem] ri-lock-line"></i>
        </div>
        <h1 className="text-[1.25rem] md:text-[1.5rem] font-bold leading-none">
          Trouble logging in?
        </h1>
        <p className="text-[1rem] md:text-[1.25rem] text-center opacity-80 leading-tight">
          Enter your email or username and we'll send you a link to get back
          into your account.
        </p>
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-5">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Your Email"
            className="w-full px-4 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
          />
          <button className="w-full px-4 py-2 rounded-md text-base text-white bg-blue-500 hover:bg-blue-600">
            Send login link
          </button>
        </form>
        <div className="w-full flex items-center gap-2 justify-center mt-5">
          <hr className="w-full h-[1px] bg-zinc-700" />
          <p className="text-xl font-semibold text-zinc-700">OR</p>
          <hr className="w-full h-[1px] bg-zinc-700" />
        </div>
        <Link to="/signup" className="text-[1.25rem] font-semibold">
          Create New Account
        </Link>
        <Link
          to="/signin"
          className="w-full md:w-[50vw] lg:w-[30rem] text-[1.25rem] opacity-80 font-semibold py-2 bg-zinc-300 border border-zinc-400 flex items-center justify-center absolute bottom-0 left-0 md:left-1/2 md:-translate-x-1/2"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
