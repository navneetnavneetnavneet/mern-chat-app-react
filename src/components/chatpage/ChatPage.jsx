import React from "react";
import MessageInput from "./MessageInput";
import TopNav from "./TopNav";
import MessageContainer from "./MessageContainer";

const ChatPage = () => {
  return (
    <div className="w-full h-screen bg-zinc-800">
        <TopNav />
        <MessageContainer />
        <MessageInput />
    </div>
  );
};

export default ChatPage;
