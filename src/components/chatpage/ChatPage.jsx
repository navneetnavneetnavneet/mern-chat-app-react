import React, { useEffect } from "react";
import MessageInput from "./MessageInput";
import TopNav from "./TopNav";
import MessageContainer from "./MessageContainer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../store/reducers/chatSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chatReducer);

  const { chatId } = useParams();

  useEffect(() => {
    dispatch(setSelectedChat(chats && chats.find((c) => c._id === chatId)));

    return () => dispatch(setSelectedChat(null));
  }, [chatId, dispatch]);

  return (
    <div className="w-full h-screen bg-zinc-800">
      <TopNav />
      <MessageContainer />
      <MessageInput />
    </div>
  );
};

export default ChatPage;
