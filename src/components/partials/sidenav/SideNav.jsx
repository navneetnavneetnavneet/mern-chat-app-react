import React from "react";
import TopNav from "./TopNav";
import Status from "./Status";
import Footer from "./Footer";
import Users from "./Users";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="relative w-full md:w-[25%] h-full bg-zinc-100">
      <TopNav />
      <div className="status w-full h-[10vh] px-4 py-4 flex items-center gap-2 border-b border-zinc-400 overflow-x-auto overflow-y-hidden">
        <Status />
        <Status />
        <Status />
        <Status />
        <Status />
        <Status />
        <Status />
        <Status />
      </div>
      <Users />
      <Link to="/group-create" className="absolute bottom-4 right-4 w-[15vw] h-[15vw] md:w-[3vw] md:h-[3vw] rounded-full flex items-center justify-center bg-zinc-600 text-white">
        <i className="ri-add-line text-2xl"></i>
      </Link>
      {/* <Footer /> */}
    </div>
  );
};

export default SideNav;
