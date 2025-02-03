import React from "react";

const Step1 = ({ currentStep, nextStep, changeHandler, formData }) => {
  return (
    <>
      <div className="">
        <span className="text-sm md:text-xs font-medium opacity-50">
          Step {currentStep}/3
        </span>
        <h1 className="text-2xl text-center font-bold opacity-70">
          Personal Information
        </h1>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <input
          onChange={changeHandler}
          value={formData.fullName}
          minLength={3}
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          className="w-full px-4 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
        />

        <input
          onChange={changeHandler}
          value={formData.dateOfBirth}
          type="date"
          name="dateOfBirth"
          placeholder="Date Of Birth (DOB)"
          className="w-full px-4 py-2 rounded-md outline-none border border-zinc-400 bg-zinc-100 text-base font-medium"
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
            <span className="text-sm font-medium">Male</span>
          </div>
          <div className="flex items-center gap-1">
            <input
              onChange={changeHandler}
              name="gender"
              value="female"
              type="radio"
              checked={formData.gender === "female" ? true : false}
            />
            <span className="text-sm font-medium">Female</span>
          </div>
          <div className="flex items-center gap-1">
            <input
              onChange={changeHandler}
              name="gender"
              value="other"
              type="radio"
              checked={formData.gender === "other" ? true : false}
            />
            <span className="text-sm font-medium">Other</span>
          </div>
        </div>
        <button
          onClick={nextStep}
          className="w-full px-4 py-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium"
        >
          Next
          <i className="ri-arrow-right-line text-base"></i>
        </button>
      </div>
    </>
  );
};

export default Step1;
