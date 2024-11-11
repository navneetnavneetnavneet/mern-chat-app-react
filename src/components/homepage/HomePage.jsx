import React from "react";
import SideNav from "../partials/sidenav/SideNav";

const Homepage = () => {
  return (
    <div className="w-full h-screen flex bg-zinc-300">
      <SideNav />
      <div className="w-[75%] h-full hidden md:flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold opacity-50">Hello, Harsh Bhaiya !</h1>
        <h4 className="text-2xl font-semibold italic opacity-40">
          Let's start conversation.
        </h4>
      </div>
    </div>
  );
};

export default Homepage;
