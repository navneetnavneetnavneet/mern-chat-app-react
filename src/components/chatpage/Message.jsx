import React from "react";

const Message = () => {
  return (
    <>
      {/* loggedIn user message */}
      <div className="message w-fit gap-1 ml-auto flex items-start justify-between mb-4">
        <div className="flex flex-col items-end">
          <p className="w-fit max-w-full px-4 py-2 rounded-md bg-blue-600 text-white text-xl md:text-base font-medium">
            Hello left
          </p>
          <span className="text-base md:text-xs font-medium text-white">
            12:47 pm
          </span>
        </div>
        <div className="w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw] rounded-full  overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://ik.imagekit.io/uxbuiyrfp/16fe0076-7a0b-45e6-aa75-559a33319c58_intqMSSl8.jpg"
            alt=""
          />
        </div>
      </div>
      {/* opposite user message */}
      <div className="message w-fit gap-1 mr-auto flex items-start justify-between mb-4">
        <div className="w-[10vw] h-[10vw] md:w-[3vw] md:h-[3vw] rounded-full  overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://ik.imagekit.io/uxbuiyrfp/16fe0076-7a0b-45e6-aa75-559a33319c58_intqMSSl8.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col items-start">
          <p className="w-fit max-w-full px-4 py-2 rounded-md bg-red-600 text-white text-xl md:text-base font-medium">
            Hello left
          </p>
          <span className="text-base md:text-xs font-medium text-white">
            12:47 pm
          </span>
        </div>
      </div>
    </>
  );
};

export default Message;
