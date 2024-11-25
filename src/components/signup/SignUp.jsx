import React, { useState } from "react";
import { Link } from "react-router-dom";
import background from "/background.jpg";
import logo from "/chatlogo.png";
import { useDispatch } from "react-redux";
import { asyncSignUpUser } from "../../store/actions/userActions";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false);

  const onSubmit = (data) => {
    dispatch(asyncSignUpUser(data));
    reset();
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
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-y-3 mt-5 text-xl font-medium md:text-base"
        >
          <div>
            <label htmlFor="fullname" className=" opacity-80">
              Full name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full px-2 py-2 rounded-md mt-1  bg-zinc-100 border border-zinc-400 outline-none "
              {...register("fullName", { required: true })}
            />
            {errors.fullName && errors.fullName.type === "required" ? (
              <span className="text-sm font-medium text-red-600">
                This field is required
              </span>
            ) : (
              ""
            )}
          </div>
          <div>
            <label htmlFor="email" className=" opacity-80">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-2 py-2 rounded-md mt-1  bg-zinc-100 border border-zinc-400 outline-none "
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
            <label htmlFor="password" className=" opacity-80">
              Password
            </label>
            <div className="w-full flex items-center justify-between rounded-md mt-1 bg-zinc-100 border border-zinc-400">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-2 py-2 rounded-md border-none bg-zinc-100 border-zinc-400 outline-none "
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
          </div>
          <div>
            <label htmlFor="confirm password" className=" opacity-80">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="Enter confirm password"
              className="w-full px-2 py-2 rounded-md mt-1 bg-zinc-100 border border-zinc-400 outline-none "
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword &&
            errors.confirmPassword.type === "required" ? (
              <span className="text-sm md:text-xs font-medium text-red-600">
                This field is required
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1">
              <input
                name="gender"
                type="radio"
                value="male"
                {...register("gender", { required: true })}
              />
              <span className="text-lg md:text-base opacity-80">Male</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="gender"
                type="radio"
                value="female"
                {...register("gender", { required: true })}
              />
              <span className="text-lg md:text-base opacity-80">Female</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                name="gender"
                type="radio"
                value="other"
                {...register("gender", { required: true })}
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
