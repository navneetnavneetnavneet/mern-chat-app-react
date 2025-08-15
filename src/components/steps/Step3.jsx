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
      <span className="text-base font-medium opacity-50 tracking-tighter">
        Step {currentStep}/3
      </span>
      <h1 className="text-center text-[1.5rem] md:text-[1.75rem] tracking-tighter font-semibold opacity-80">
        OTP Verification
      </h1>
      <div className="flex flex-col gap-5 mt-5 font-medium">
        <input
          onChange={changeHandler}
          value={formData.otp}
          type="text"
          name="otp"
          placeholder="Enter OTP"
          className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400 text-base"
        />
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={prevStep}
            className="w-full px-2 py-2 flex items-center justify-center gap-2 bg-zinc-500 hover:bg-zinc-600 rounded-md text-white font-medium"
          >
            <i className="ri-arrow-left-line text-base"></i>
            Prev
          </button>
          <button
            onClick={submitHandler}
            className="w-full px-2 py-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium"
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
