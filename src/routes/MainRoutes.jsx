import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import SignUp from "../components/signup/SignUp";
import SignIn from "../components/signin/SignIn";
import Profile from "../components/profile/Profile";
import ChatPage from "../components/chatpage/ChatPage";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadUser } from "../store/actions/userActions";
import { asyncFetchAllChats } from "../store/actions/chatActions";
import { setChats } from "../store/reducers/chatSlice";
import CreateGroup from "../components/group/CreateGroup";
import EditProfile from "../components/edit-profile/EditProfile";

const MainRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.userReducer);

  // console.log(user);
  // console.log(user);

  useEffect(() => {
    dispatch(asyncLoadUser());

    if (isAuthenticated) {
      dispatch(asyncFetchAllChats());
    }

    isAuthenticated && navigate("/");
    !isAuthenticated && navigate("/signin");

    return () => setChats([]);
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
      </Routes>
    </>
  );
};

export default MainRoutes;
