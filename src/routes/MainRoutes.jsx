import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import SignUp from "../components/signup/SignUp";
import SignIn from "../components/signin/SignIn";
import Profile from "../components/profile/Profile";
import ChatPage from "../components/chatpage/ChatPage";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchAllUser, asyncLoadUser } from "../store/actions/userActions";
import { asyncFetchAllChats } from "../store/actions/chatActions";
import { setChats } from "../store/reducers/chatSlice";
import CreateGroup from "../components/group/CreateGroup";
import EditProfile from "../components/edit-profile/EditProfile";
import { asyncFetchAllStatus } from "../store/actions/statusActions";
import { setAllStatus } from "../store/reducers/statusSlice";
import UploadStatus from "../components/status/UploadStatus";
import ShowStatus from "../components/status/ShowStatus";
import { setAllUser } from "../store/reducers/userSlice";

const MainRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(asyncLoadUser());

    if (isAuthenticated) {
      dispatch(asyncFetchAllChats());
      dispatch(asyncFetchAllStatus());
      dispatch(asyncFetchAllUser());
    }

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
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/chat/:chatId" element={<ChatPage />} />
        <Route path="/group-create" element={<CreateGroup />} />
        <Route path="/status/:userId" element={<ShowStatus />} />
        <Route path="/status/upload" element={<UploadStatus />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
