import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import SignUp from "../components/signup/SignUp";
import SignIn from "../components/signin/SignIn";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
