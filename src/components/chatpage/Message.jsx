import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

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
              <p className="w-fit max-w-full px-4 py-2 rounded-md bg-blue-600 text-white text-xl md:text-base font-medium">
                {message.content}
              </p>
              <span className="text-base md:text-xs font-medium text-white">
                {new Date(message.createdAt).toLocaleTimeString("en-In", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw] rounded-full  overflow-hidden">
              {/* loggedInUser profile image */}
              <img
                className="w-full h-full object-cover"
                src="https://ik.imagekit.io/uxbuiyrfp/16fe0076-7a0b-45e6-aa75-559a33319c58_intqMSSl8.jpg"
                alt=""
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw] rounded-full  overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={message.senderId?.profileImage}
                alt=""
              />
            </div>
            <div className="flex flex-col items-start">
              <p className="w-fit max-w-full px-4 py-2 rounded-md bg-red-600 text-white text-xl md:text-base font-medium">
                {message.content}
              </p>
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
