import React, { useState } from "react";
import { Link } from "react-router-dom";
import background from "/background.jpg";
import logo from "/chatlogo.png";
import { useDispatch } from "react-redux";
import { asyncSignInUser } from "../store/actions/userActions";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const SignInPage = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await dispatch(asyncSignInUser(data));

    reset();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-screen flex items-center justify-center bg-zinc-100 px-4 sm:px-8 py-4"
    >
      <div className="w-full md:w-[50vw] lg:w-[30vw] py-5 bg-white rounded-xl">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 md:w-16 md:h-16 border border-zinc-400 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src={logo} alt="" />
          </div>
          <h1 className="text-center text-[1.75rem] md:text-[2rem] leading-none font-bold">
            Welcome to <span className="text-blue-600">Chat</span>
            <span className="text-orange-600">X</span>
          </h1>
          <p className="text-center text-[1rem] md:text-base font-medium opacity-80">
            Please enter your details to sign in.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-3 mt-5 px-4 py-2 font-medium"
        >
          <div>
            <label htmlFor="email" className="text-xl md:text-lg opacity-80">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
              {...register("email", { required: true })}
            />
            {errors.email && errors.email.type === "required" ? (
              <span className="text-sm md:text-xs font-medium text-red-600">
                This field is required
              </span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label htmlFor="password" className="text-xl md:text-lg opacity-80">
              Password
            </label>
            <div className="w-full flex items-center justify-between rounded-md bg-zinc-100 border border-zinc-400">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-4 py-2 rounded-md outline-none bg-zinc-100 text-base font-medium"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 15,
                })}
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
            {errors.password && errors.password.type === "required" ? (
              <span className="text-sm md:text-xs font-medium text-red-600">
                This field is required
              </span>
            ) : (
              ""
            )}
            {errors.password && errors.password.type === "minLength" ? (
              <span className="text-sm md:text-xs font-medium text-red-600">
                Password have minimum 6 characters
              </span>
            ) : (
              ""
            )}
            {errors.password && errors.password.type === "maxLength" ? (
              <span className="text-sm md:text-xs font-medium text-red-600">
                Password have maximum 15 characters
              </span>
            ) : (
              ""
            )}
            <Link
              to="/forgot-password"
              className="w-full inline-block text-end mt-1 text-[1rem] text-blue-600 font-medium"
            >
              Forger Password ?
            </Link>
          </div>
          <button className="w-full px-4 py-2 rounded-md text-base text-white bg-blue-500 hover:bg-blue-600">
            Sign In
          </button>
        </form>
        <p className="text-center mt-3 text-[1rem">
          Don't have an account ?{" "}
          <Link to="/signup" className="text-blue-600 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
