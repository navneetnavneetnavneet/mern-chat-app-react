import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import SignUp from "../components/signup/SignUp";
import SignIn from "../components/signin/SignIn";
import Profile from "../components/profile/Profile";
import ChatPage from "../components/chatpage/ChatPage";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
