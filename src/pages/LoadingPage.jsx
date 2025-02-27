import React from "react";
import logo from "/chatlogo.png";

const LoadingPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img className="w-40" src={logo} alt="" />
    </div>
  );
};

export default LoadingPage;
