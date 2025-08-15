import React, { useContext, useEffect, useState } from "react";
import MessageInput from "../components/chatpage/MessageInput";
import TopNav from "../components/chatpage/TopNav";
import MessageContainer from "../components/chatpage/MessageContainer";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../store/reducers/chatSlice";
import { asyncFetchAllMessages } from "../store/actions/messageActions";
import { setMessages } from "../store/reducers/messageSlice";
import { socketContext } from "../context/SocketContext";
import LoadingPage from "./LoadingPage";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { chats, slectedChat } = useSelector((state) => state.chatReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  const { socket } = useContext(socketContext);

  const { chatId } = useParams();

  useEffect(() => {
    if (!socket || !chatId) return;
    socket.emit("join-room", chatId);

    dispatch(setSelectedChat(chats && chats.find((c) => c._id === chatId)));
    dispatch(asyncFetchAllMessages(chatId));

    return () => {
      dispatch(setSelectedChat(null));
      dispatch(setMessages([]));
    };
  }, [chatId, dispatch, socket, chats]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message-received", (msg) => {
      dispatch(setMessages([...messages, msg]));
    });
  }, [messages, dispatch]);

  return chatId ? (
    <div className="relative w-full h-screen bg-zinc-800">
      <TopNav />
      <MessageContainer />
      <MessageInput />
      <Outlet />
    </div>
  ) : (
    <LoadingPage />
  );
};

export default ChatPage;
