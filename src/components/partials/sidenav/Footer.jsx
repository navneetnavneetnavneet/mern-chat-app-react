import React from "react";
import { useDispatch } from "react-redux";
import { asyncSignOutUser } from "../../../store/actions/userActions";
import { Link } from "react-router-dom";

const Footer = () => {
  const dispatch = useDispatch();

  return (
    <div className="w-full h-[10vh] px-4 py-4 flex items-center justify-between">
      <div
        onClick={() => dispatch(asyncSignOutUser())}
        className="px-8 py-4 md:px-6 md:py-2 flex items-center gap-1 rounded-full bg-zinc-600 text-white"
      >
        <i className="ri-logout-box-line text-lg"></i>
        <span className="text-lg">Logout</span>
      </div>
      <Link to="/group-create" className="w-[15vw] h-[15vw] md:w-[3vw] md:h-[3vw] rounded-full flex items-center justify-center bg-zinc-600 text-white">
        <i className="ri-add-line text-2xl"></i>
      </Link>
    </div>
  );
};

export default Footer;
