import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { asyncResetPassword } from "../store/actions/userActions";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetToken } = useParams();

  const [show, setShow] = useState(false);
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
    <div className="w-full h-screen bg-zinc-100 px-4 py-4">
      <div className="md:w-[50vw] lg:w-[30vw] mx-auto flex flex-col items-center gap-5">
        <div className="w-[6rem] h-[6rem] md:w-[8rem] md:h-[8rem] mt-5 rounded-full border-2 flex items-center justify-center">
          <i className="text-[3rem] ri-lock-line"></i>
        </div>
        <h1 className="text-[1.25rem] md:text-[1.5rem] font-bold leading-none">
          Create a strong password
        </h1>
        <p className="text-[1rem] md:text-[1.25rem] text-center opacity-80 leading-tight">
          A strong password should be unique, long, and difficult to guess. It
          must include uppercase and lowercase letters, numbers, and special
          characters. Always use different passwords for different accounts and
          update them regularly to enhance security.
        </p>
        <form onSubmit={submitHandler} className="w-full flex flex-col gap-5">
          <div className="flex items-center w-full px-4 bg-zinc-100 rounded-md border border-zinc-400">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              className="w-full py-2 text-base font-medium bg-zinc-100 outline-none"
            />
            <span
              onClick={() => setShow(!show)}
              className="text-sm rounded-md font-medium cursor-pointer "
            >
              <i
                className={`ri-eye-${show ? "" : "off-"}line cursor-pointer`}
              ></i>
            </span>
          </div>
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
    </div>
  );
};

export default ResetPasswordPage;
