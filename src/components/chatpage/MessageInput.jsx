import React, { useState } from "react";

const MessageInput = () => {
  const [messageInput, setMessageInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    console.log({ messageInput });
  };

  return (
    <div className="w-full h-[10vh] px-2">
      <form
        onSubmit={submitHandler}
        className="w-full h-full flex items-center gap-2"
      >
        <div className="w-full flex items-center bg-white rounded-full px-4">
          <input
            onChange={(e) => setMessageInput(e.target.value)}
            value={messageInput}
            type="text"
            placeholder="message . . ."
            className="w-full py-3 rounded-full bg-transparent outline-none border-none text-xl font-medium"
          />
          <input type="file" hidden={true} />
          <i className="ri-attachment-line cursor-pointer text-xl font-medium"></i>
        </div>
        <button className="px-4 py-3 rounded-full bg-zinc-50">
          <i className="ri-send-plane-2-fill"></i>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
