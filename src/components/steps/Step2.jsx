import React, { useState } from "react";

const Step2 = ({
  currentStep,
  sendOTPHandler,
  prevStep,
  formData,
  changeHandler,
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="">
        <span className="text-[1rem] font-medium opacity-50">
          Step {currentStep}/3
        </span>
        <h1 className="text-[1.25rem] md:text-[1.5rem] text-center font-bold opacity-80">
          Contact Information
        </h1>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <input
          onChange={changeHandler}
          value={formData.email}
          type="email"
          name="email"
          placeholder="Enter Email"
          className="w-full px-4 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
        />
        <div className="flex items-center w-full px-4 bg-zinc-100 rounded-md border border-zinc-400">
          <input
            onChange={changeHandler}
            value={formData.password}
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
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prevStep}
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-zinc-500 hover:bg-zinc-600 rounded-md text-white font-medium"
          >
            <i className="ri-arrow-left-line text-base"></i>
            Prev
          </button>
          <button
            onClick={sendOTPHandler}
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium"
          >
            Next
            <i className="ri-arrow-right-line text-base"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Step2;
