import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import SignUp from "../components/signup/SignUp";
import SignIn from "../components/signin/SignIn";
import Profile from "../components/profile/Profile";
import ChatPage from "../components/chatpage/ChatPage";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadUser } from "../store/actions/userActions";

const MainRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.userReducer);

  console.log(user);

  useEffect(() => {
    dispatch(asyncLoadUser());

    isAuthenticated && navigate("/");
    !isAuthenticated && navigate("/signin");
  }, [isAuthenticated]);

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
