import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncDeleteStatus } from "../store/actions/statusActions";

const ShowStatusPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(30);

  const { user } = useSelector((state) => state.userReducer);
  const { allUser } = useSelector((state) => state.userReducer);
  const statusUser = allUser.find((u) => u._id == userId);

  useEffect(() => {
    let interval;
    if (statusUser.status.length > 0) {
      interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 30);

      if (progress >= 100) {
        setProgress(0);
        if (currentIndex < statusUser?.status.length - 1) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          navigate("/");
        }
      }
      return () => clearInterval(interval);
    } else {
      navigate("/");
    }
  }, [currentIndex, progress, statusUser]);

  const previousStatusHandler = () => {
    setProgress(0);
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      navigate("/");
    }
  };

  const nextStatusHandler = () => {
    setProgress(0);
    if (currentIndex < statusUser?.status.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      navigate("/");
    }
  };

  return (
    statusUser &&
    user && (
      <div className="relative w-full h-screen bg-zinc-100 overflow-hidden">
        <div
          style={{
            background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))`,
          }}
          className="absolute top-0 left-0 z-[999] w-full h-[10vh] px-4 py-4 flex items-center justify-between text-white border-b border-zinc-400"
        >
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              <img
                className="w-full h-full object-cover rounded-full overflow-hidden"
                src={statusUser.profileImage.url}
                alt=""
              />
              {statusUser?._id === user?._id ? (
                <Link
                  to="/status/upload"
                  className="w-6 h-6 absolute z-[100] bottom-0 right-0 translate-x-1/4 translate-y-1/4 flex items-center justify-center rounded-full bg-zinc-200  border-2 border-zinc-600 "
                >
                  <i className="ri-add-line text-[1.4rem] font-semibold md:font-normal"></i>
                </Link>
              ) : (
                ""
              )}
            </div>
            <h1 className="text-xl font-medium leading-none">
              {statusUser.fullName}
            </h1>
          </div>
          {statusUser._id === user?._id && (
            <i
              onClick={async () =>
                await dispatch(
                  asyncDeleteStatus(statusUser?.status[currentIndex]?._id)
                )
              }
              className="ri-delete-bin-line z-[2000] text-xl"
            ></i>
          )}
          <div className="absolute bottom-0 left-0 w-full h-[3px] z-10 bg-zinc-400 overflow-hidden">
            <div
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-white"
            ></div>
          </div>
        </div>
        <div className="w-full h-full overflow-hidden">
          {statusUser?.status[currentIndex]?.media.fileType === "image" ? (
            <img
              className="w-full h-full object-cover"
              src={statusUser?.status[currentIndex]?.media.url}
              alt=""
            />
          ) : (
            <video
              className="w-full h-full object-cover"
              autoPlay={true}
              loop={false}
              muted={true}
              src={statusUser?.status[currentIndex]?.media.url}
            ></video>
          )}
        </div>
        <div
          onClick={previousStatusHandler}
          className="absolute top-0 left-0 z-[200] w-1/2 h-full"
        ></div>
        <div
          onClick={nextStatusHandler}
          className="absolute top-0 right-0 z-[200] w-1/2 h-full"
        ></div>
        <div className="absolute bottom-0 w-full h-[10vh] flex items-center px-4 text-white font-medium">
          <form className="w-full flex items-center gap-2">
            <input
              type="text"
              placeholder="message . . ."
              className="w-full px-4 py-2 rounded-full bg-transparent outline-none border-2 border-zinc-400 text-xl"
            />
            <button className="px-4 py-3 rounded-full bg-zinc-50 text-zinc-600">
              <i className="ri-send-plane-2-fill"></i>
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default ShowStatusPage;
