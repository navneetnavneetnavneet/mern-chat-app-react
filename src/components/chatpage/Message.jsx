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
          user?._id === message.senderId._id ? "ml-auto" : "mr-auto"
        } w-fit gap-1 flex items-start justify-between mb-4`}
      >
        {user?._id === message.senderId._id ? (
          <>
            <div className="flex flex-col items-end">
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
                      className="w-80 bg-zinc-700 flex items-center gap-2 px-2 py-2"
                    >
                      <i className="ri-file-text-line text-[2rem] font-normal text-white"></i>
                      <span className="text-blue-600 text-lg">
                        {message.media?.url.slice(0, 30)}
                      </span>
                    </Link>
                  )}
                </div>
              )}
              {message.content?.trim() !== "" && (
                <p className="w-fit max-w-full px-4 py-2 mt-2 rounded-md bg-blue-600 text-white text-xl md:text-base font-medium">
                  {message.content?.trim()}
                </p>
              )}
              <span className="text-base md:text-xs font-medium text-white">
                {new Date(message.createdAt).toLocaleTimeString("en-In", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw] rounded-full  overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={user.profileImage.url}
                alt=""
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw] rounded-full  overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={message.senderId?.profileImage.url}
                alt=""
              />
            </div>
            <div className="flex flex-col items-start">
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
                      className="w-80 bg-zinc-600 flex items-center gap-2 px-2 py-4"
                    >
                      <i className="ri-file-text-line text-[2rem] font-normal"></i>
                      <span className="text-blue-600 text-lg">
                        {message.media?.url.slice(0, 30)}
                      </span>
                    </Link>
                  )}
                </div>
              )}
              {message.content?.trim() !== "" && (
                <p className="w-fit max-w-full px-4 py-2 rounded-md bg-red-600 text-white text-xl md:text-base font-medium">
                  {message.content?.trim()}
                </p>
              )}
              <span className="text-base md:text-xs font-medium text-white">
                {new Date(message.createdAt).toLocaleTimeString("en-In", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default Message;
