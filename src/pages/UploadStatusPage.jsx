import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { asyncUploadStatus } from "../store/actions/statusActions";

const UploadStatusPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  const [media, setMedia] = useState("");

  const imageRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!media) {
      return toast.warning("Media is required !");
    }

    await dispatch(asyncUploadStatus(media));
    navigate("/");
  };

  return (
    user && (
      <div className="w-full h-screen bg-zinc-100">
        <div className="w-full h-[10vh] border-b border-zinc-400 px-4 py-4 flex items-center justify-between">
          <i
            onClick={() => navigate("/")}
            className="ri-arrow-left-line text-2xl cursor-pointer"
          ></i>
          <h1 className="text-2xl md:text-3xl font-semibold">Upload Status</h1>
          <i className="ri-settings-3-line text-2xl cursor-pointer"></i>
        </div>
        <div className="flex flex-col items-center px-4 py-4 mt-5 gap-5">
          <div
            onClick={() => imageRef.current?.click()}
            className="w-32 h-32 rounded-full flex items-center justify-center border border-zinc-400"
          >
            <i className="ri-image-line text-7xl"></i>
          </div>
        </div>
        <form
          onSubmit={submitHandler}
          className="w-full md:w-[35%] mx-auto px-4 py-4 flex items-center justify-center flex-col"
        >
          <input
            type="file"
            hidden={true}
            ref={imageRef}
            onChange={(e) => setMedia(e.target.files[0])}
          />
          <button className="px-4 py-2 w-full rounded-md outline-none bg-blue-500 hover:bg-blue-600 text-white text-base font-medium">
            Upload Status
          </button>
        </form>
      </div>
    )
  );
};

export default UploadStatusPage;
