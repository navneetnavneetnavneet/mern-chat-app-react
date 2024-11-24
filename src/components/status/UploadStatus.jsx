import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { asyncUploadStatus } from "../../store/actions/statusActions";

const UploadStatus = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  const [media, setMedia] = useState("");

  const imageRef = useRef();

  const imageHandler = () => {
    imageRef.current?.click();
  };

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
            className="ri-arrow-left-s-line text-3xl"
          ></i>
          <h1 className="text-3xl font-semibold">Upload Status</h1>
          <i className="ri-settings-3-line text-3xl"></i>
        </div>
        <div className="flex flex-col items-center my-5 gap-5">
          <div className="w-[30vw] h-[30vw] md:w-[8vw] md:h-[8vw] rounded-full border-2 border-zinc-400 flex items-center justify-center overflow-hidden">
            <i className="ri-image-line text-7xl"></i>
          </div>
          <button
            onClick={imageHandler}
            className="px-4 py-2 rounded-md outline-none bg-blue-500 hover:bg-blue-600 text-white font-medium"
          >
            Select Image
          </button>
        </div>
        <form
          onSubmit={submitHandler}
          className="w-full px-4 py-4 flex items-center justify-center flex-col"
        >
          <input
            type="file"
            hidden={true}
            ref={imageRef}
            onChange={(e) => setMedia(e.target.files[0])}
          />
          <button className="px-4 py-2 w-full rounded-md outline-none bg-blue-500 hover:bg-blue-600 text-white font-medium">
            Upload Status
          </button>
        </form>
      </div>
    )
  );
};

export default UploadStatus;
