import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import ProfilePage from "../pages/ProfilePage";
import EditProfilePage from "../pages/EditProfilePage";
import ChatPage from "../pages/ChatPage";
import CreateGroupPage from "../pages/CreateGroupPage";
import ShowStatusPage from "../pages/ShowStatusPage";
import UploadStatusPage from "../pages/UploadStatusPage";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchAllUser, asyncLoadUser } from "../store/actions/userActions";
import { asyncFetchAllChats } from "../store/actions/chatActions";
import { setChats } from "../store/reducers/chatSlice";
import { asyncFetchAllStatus } from "../store/actions/statusActions";
import { setAllStatus } from "../store/reducers/statusSlice";
import { setAllUser } from "../store/reducers/userSlice";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const MainRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(asyncLoadUser());
    dispatch(asyncFetchAllChats());
    dispatch(asyncFetchAllStatus());
    dispatch(asyncFetchAllUser());

    isAuthenticated && navigate("/");
    !isAuthenticated && navigate("/signin");

    return () => {
      dispatch(setChats([]));
      dispatch(setAllStatus([]));
      dispatch(setAllUser([]));
    };
  }, [isAuthenticated, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit" element={<EditProfilePage />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/group-create" element={<CreateGroupPage />} />
        <Route path="/status/:userId" element={<ShowStatusPage />} />
        <Route path="/status/upload" element={<UploadStatusPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:resetToken" element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
