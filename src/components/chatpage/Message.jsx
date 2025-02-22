import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Message = ({ message }) => {
  const scrollRef = useRef(null);
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    user &&
    message && (
      <div
        ref={scrollRef}
        className={`${
          message.senderId?._id === user?._id
            ? "ml-auto"
            : "mr-auto flex-row-reverse"
        } w-fit gap-2 flex items-start justify-between mb-4`}
      >
        <div
          className={`flex flex-col ${
            message.senderId?._id === user?._id ? "items-end" : "items-start"
          }`}
        >
          {message.media && message.media.url !== "" && (
            <div className="rounded-md overflow-hidden">
              {message.media.fileType === "image" && (
                <img
                  className="w-80 h-60 object-cover"
                  src={message.media.url}
                  alt=""
                />
              )}
              {message.media.fileType === "video" && (
                <video
                  autoPlay={false}
                  loop={false}
                  muted={true}
                  controls={true}
                  className="w-80 h-60 object-cover"
                  src={message.media.url}
                ></video>
              )}
              {message.media.fileType === "text" && (
                <Link
                  target="_blank"
                  to={message.media?.url}
                  className="w-full bg-zinc-700 flex items-center gap-2 px-2 py-2"
                >
                  <i className="ri-file-text-line text-[1.2rem] font-normal text-white"></i>
                  <span className="text-blue-600 text-[1rem] md:text-[1.25rem]">
                    {message.media?.url.slice(0, 30)}...
                  </span>
                </Link>
              )}
            </div>
          )}
          {message.content?.trim() !== "" && (
            <p className="w-fit max-w-full md:max-w-96 px-4 py-2 mt-2 rounded-md bg-blue-600 text-white text-[1rem] md:text-[1.25rem] leading-tight">
              {message.content?.trim()}
            </p>
          )}
          <span className="text-[.8rem] md:text-[1rem] font-medium text-white">
            {new Date(message.createdAt).toLocaleTimeString("en-In", {
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={message.senderId?.profileImage.url}
            alt=""
          />
        </div>
      </div>
    )
  );
};

export default Message;
