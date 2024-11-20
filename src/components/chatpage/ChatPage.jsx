import React, { useContext, useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import TopNav from "./TopNav";
import MessageContainer from "./MessageContainer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../store/reducers/chatSlice";
import { asyncFetchAllMessages } from "../../store/actions/messageActions";
import { setMessages } from "../../store/reducers/messageSlice";
import { socketContext } from "../../context/SocketContext";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chatReducer);
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

  return (
    <div className="w-full h-screen bg-zinc-800">
      <TopNav />
      <MessageContainer />
      <MessageInput />
    </div>
  );
};

export default ChatPage;
