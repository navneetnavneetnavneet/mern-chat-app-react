import React from "react";
import SideNav from "../components/sidenav/SideNav";
import { useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";

const HomePage = () => {
  const { user } = useSelector((state) => state.userReducer);

  return user ? (
    <div className="w-full h-screen flex bg-zinc-100">
      <SideNav />
      <div className="sm:w-[50vw] md:w-[60vw] lg:w-[70vw] px-4 h-full text-center hidden sm:flex flex-col gap-3 items-center justify-center">
        <h1 className="sm:text-[2rem] md:text-[3rem] lg:text-[4rem] leading-none font-bold opacity-50">
          Hello, {user.fullName} !
        </h1>
        <h4 className="sm:text-[1.3rem] md:text-[1.5rem] lg:text-[2rem] font-semibold leading-none italic opacity-40">
          Let's start conversation.
        </h4>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default HomePage;
