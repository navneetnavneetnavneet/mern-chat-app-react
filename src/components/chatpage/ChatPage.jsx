import React, { useEffect } from "react";
import MessageInput from "./MessageInput";
import TopNav from "./TopNav";
import MessageContainer from "./MessageContainer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncAccessChat } from "../../store/actions/chatActions";
import { setSelectedChat } from "../../store/reducers/chatSlice";
import { asyncFetchAllMessages } from "../../store/actions/messageActions";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { selectedChat } = useSelector((state) => state.chatReducer);

  useEffect(() => {
    dispatch(asyncAccessChat(userId));

    return () => dispatch(setSelectedChat(null));
  }, [userId]);

  useEffect(() => {
    selectedChat && dispatch(asyncFetchAllMessages(selectedChat._id));
  }, [selectedChat]);

  return (
    <div className="w-full h-screen bg-zinc-800">
      <TopNav />
      <MessageContainer />
      <MessageInput />
    </div>
  );
};

export default ChatPage;
