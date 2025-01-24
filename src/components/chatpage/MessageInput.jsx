import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSendMessage } from "../../store/actions/messageActions";
import { socketContext } from "../../context/SocketContext";
import axios from "../../utils/axios";
import { setMessages } from "../../store/reducers/messageSlice";

const MessageInput = () => {
  const dispatch = useDispatch();
  const { selectedChat } = useSelector((state) => state.chatReducer);
  const { messages } = useSelector((state) => state.messageReducer);

  const { socket } = useContext(socketContext);

  const [messageInput, setMessageInput] = useState("");
  const [media, setMedia] = useState("");

  const fileRef = useRef();

  const fileHandler = () => {
    fileRef.current.click();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!selectedChat || (!messageInput && !media)) {
      return;
    }

    try {
      const { data } = await axios.post(
        `/messages/send-message`,
        {
          chatId: selectedChat?._id,
          content: messageInput,
          media: media,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data) {
        socket && socket.emit("new-message", data);
        await dispatch(setMessages([...messages, data]));
      }
    } catch (error) {
      console.log(error.response?.data);
    }

    setMessageInput("");
    setMedia("");
  };

  return (
    <div className="w-full h-[10vh] px-4">
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
          <input
            onChange={(e) => setMedia(e.target.files[0])}
            ref={fileRef}
            type="file"
            hidden={true}
          />
          <i
            onClick={fileHandler}
            className="ri-attachment-line cursor-pointer text-xl font-medium"
          ></i>
        </div>
        <button className="px-4 py-3 rounded-full bg-zinc-50">
          <i className="ri-send-plane-2-fill"></i>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
