import React from "react";
import logo from "/chatlogo.png";

const LoadingPage = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen bg-zinc-100 flex items-center justify-center">
      <img className="w-40" src={logo} alt="" />
    </div>
  );
};

export default LoadingPage;
