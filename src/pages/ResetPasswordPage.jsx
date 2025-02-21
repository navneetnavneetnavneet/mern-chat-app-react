import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncResetPassword } from "../store/actions/userActions";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetToken } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.warning("Password must be atleast 6 characters");
    }

    if (password.length > 15) {
      return toast.warning(
        "Password should not be exceed more than 15 characters"
      );
    }

    if (password !== confirmPassword) {
      return toast.warning("Password does not match !");
    }

    await dispatch(asyncResetPassword(password, resetToken));
    navigate("/signin");
    toast.success("Password changed successfully !");
  };

  return (
    <div className="w-full h-screen bg-zinc-100 px-4 py-4 flex flex-col gap-5 items-center">
      <div className="w-24 h-24 mt-10 rounded-full border-2 flex items-center justify-center">
        <i className="text-[3rem] ri-lock-line"></i>
      </div>
      <h1 className="text-2xl font-semibold">Create a strong password</h1>
      <p className="text-lg text-center opacity-80">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
        numquam? At, ut. Fugit, doloremque eum.
      </p>
      <form onSubmit={submitHandler} className="w-full flex flex-col gap-5">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
        />
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
        />
        <button className="w-full px-4 py-2 rounded-md text-base text-white bg-blue-500 hover:bg-blue-600">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
