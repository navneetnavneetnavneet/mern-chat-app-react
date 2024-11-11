import React from "react";
import TopNav from "./TopNav";
import Status from "./Status";
import Footer from "./Footer";
import Users from "./Users";

const SideNav = () => {
  return (
    <div className="w-full md:w-[25%] h-full bg-zinc-100">
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
      <Footer />
    </div>
  );
};

export default SideNav;
