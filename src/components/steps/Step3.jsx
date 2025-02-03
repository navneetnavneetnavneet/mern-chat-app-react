import React from "react";

const Step3 = ({
  currentStep,
  prevStep,
  formData,
  changeHandler,
  submitHandler,
}) => {
  return (
    <>
      <div className="">
        <span className="text-sm md:text-xs font-medium opacity-50">
          Step {currentStep}/3
        </span>
        <h1 className="text-2xl text-center font-bold opacity-70">OTP Verification</h1>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <input
          onChange={changeHandler}
          value={formData.otp}
          type="number"
          name="otp"
          placeholder="Enter OTP"
          className="w-full px-4 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
        />
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prevStep}
            className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-zinc-500 hover:bg-zinc-600 rounded-md text-white font-medium"
          >
            <i className="ri-arrow-left-line text-base"></i>
            Prev
          </button>
          <button
            onClick={submitHandler}
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

export default Step3;
