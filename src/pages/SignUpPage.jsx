import React, { useState } from "react";
import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";
import background from "/background.jpg";
import logo from "/chatlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { asyncSendOtp, asyncSignUpUser } from "../store/actions/userActions";

const MultiStepSignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    otp: "",
  });

  const nextStep = () => {
    const { fullName, dateOfBirth, gender } = formData;
    if (!fullName || !dateOfBirth || !gender) {
      return toast.warning("All fields are must be required !");
    }

    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOTPHandler = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      return toast.warning("Email or Password is required !");
    }

    if (password.length < 6) {
      return toast.warning("Password minimum 6 characters !");
    }

    if (password.length > 15) {
      return toast.warning("Password maximum 15 characters !");
    }

    const otp = await dispatch(asyncSendOtp(email));
    console.log(otp);
    if (otp) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const submitHandler = async () => {
    let { otp } = formData;

    if (!otp) {
      return toast.warning("OTP is required !");
    }

    if (otp.length !== 6) {
      return toast.warning("OTP must be 6 characters !");
    }

    await dispatch(asyncSignUpUser(formData));
    navigate("/");

    setFormData({
      ...formData,
      fullName: "",
      dateOfBirth: "",
      gender: "",
      email: "",
      password: "",
      otp: "",
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full h-screen flex items-center justify-center bg-zinc-100 px-2 md:px-4 py-4"
    >
      <div className="w-full md:w-[40vw] lg:w-[30vw] py-5 bg-white rounded-xl">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-zinc-400 overflow-hidden">
            <img className="w-full h-full object-cover" src={logo} alt="" />
          </div>
          <h1 className="text-center text-[1.5rem] md:text-[1.75rem] tracking-tighter font-bold">
            Welcome to <span className="text-blue-600">Chat</span>
            <span className="text-orange-600">X</span>
          </h1>
          <p className="px-2 text-center text-base tracking-tighter leading-none font-medium opacity-80">
            Register to create your first account and start exploring the chat
            in ChatX.
          </p>
        </div>
        <div className="w-full px-2 md:px-4 py-4 border-b border-zinc-400 flex items-center justify-between">
          <h1
            className={`${
              currentStep === 1 ? "" : "opacity-50"
            } inline-block text-base font-medium px-6 py-1 rounded-full text-white bg-blue-500`}
          >
            Step-1
          </h1>
          <h1
            className={`${
              currentStep === 2 ? "" : "opacity-50"
            } inline-block text-base font-medium px-6 py-1 rounded-full text-white bg-blue-500`}
          >
            Step-2
          </h1>
          <h1
            className={`${
              currentStep === 3 ? "" : "opacity-50"
            } inline-block text-base font-medium px-6 py-1 rounded-full text-white bg-blue-500`}
          >
            Step-3
          </h1>
        </div>
        <div className="w-full px-2 md:px-4 py-2">
          {currentStep === 1 && (
            <Step1
              currentStep={currentStep}
              nextStep={nextStep}
              changeHandler={changeHandler}
              formData={formData}
            />
          )}
          {currentStep === 2 && (
            <Step2
              currentStep={currentStep}
              sendOTPHandler={sendOTPHandler}
              prevStep={prevStep}
              changeHandler={changeHandler}
              formData={formData}
            />
          )}
          {currentStep === 3 && (
            <Step3
              currentStep={currentStep}
              prevStep={prevStep}
              changeHandler={changeHandler}
              formData={formData}
              submitHandler={submitHandler}
            />
          )}
        </div>
        <p className="text-center text-base md:text-sm  text-zinc-700 font-medium tracking-tighter">
          Already have an account ?{" "}
          <Link to="/signin" className="text-blue-600 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MultiStepSignUpPage;
