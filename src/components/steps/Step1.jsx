import React from "react";

const Step1 = ({ currentStep, nextStep, changeHandler, formData }) => {
  return (
    <>
      <span className="text-base font-medium opacity-50 tracking-tighter">
        Step {currentStep}/3
      </span>
      <h1 className="text-center text-[1.5rem] md:text-[1.75rem] tracking-tighter font-semibold opacity-80">
        Personal Information
      </h1>
      <div className="flex flex-col gap-y-5 pt-5 font-medium">
        <input
          onChange={changeHandler}
          value={formData.fullName}
          minLength={3}
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400 text-base"
        />

        <input
          onChange={changeHandler}
          value={formData.dateOfBirth}
          type="date"
          name="dateOfBirth"
          placeholder="Date Of Birth (DOB)"
          className="w-full px-2 py-2 rounded-md outline-none border border-zinc-400 text-base"
        />
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <input
              onChange={changeHandler}
              name="gender"
              value="male"
              type="radio"
              checked={formData.gender === "male" ? true : false}
            />
            <span className="text-base font-medium opacity-80">Male</span>
          </div>
          <div className="flex items-center gap-1">
            <input
              onChange={changeHandler}
              name="gender"
              value="female"
              type="radio"
              checked={formData.gender === "female" ? true : false}
            />
            <span className="text-base font-medium opacity-80">Female</span>
          </div>
          <div className="flex items-center gap-1">
            <input
              onChange={changeHandler}
              name="gender"
              value="other"
              type="radio"
              checked={formData.gender === "other" ? true : false}
            />
            <span className="text-base font-medium opacity-80">Other</span>
          </div>
        </div>
        <button
          onClick={nextStep}
          className="w-full px-2 py-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
        >
          Next
          <i className="ri-arrow-right-line text-base"></i>
        </button>
      </div>
    </>
  );
};

export default Step1;
