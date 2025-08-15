import React from "react";
import SideNav from "../components/sidenav/SideNav";
import { useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";

const HomePage = () => {
  const { user } = useSelector((state) => state.userReducer);

  return user ? (
    <div className="w-full h-screen flex bg-zinc-100">
      <SideNav />
      <div className="w-full sm:w-[50vw] md:w-[60vw] lg:w-[70vw] px-2 md:px-4 h-full text-center hidden sm:flex flex-col gap-3 items-center justify-center">
        <h1 className="sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] tracking-tighter leading-none font-bold opacity-60">
          Hello, {user.fullName} !
        </h1>
        <h4 className="sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] font-medium tracking-tighter leading-none italic text-gray-500">
          Let's <span className="text-orange-500">start</span> conversation.
        </h4>
      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default HomePage;
