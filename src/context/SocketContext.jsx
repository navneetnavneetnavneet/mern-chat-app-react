import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setOnlineUsers } from "../store/reducers/userSlice";

export const socketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null); // Start with null for clarity
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect(); // Disconnect socket if the user logs out
        setSocket(null); // Clear the socket instance
      }
      return;
    }

    // Initialize the socket connection
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    // Setup the socket for the current user
    newSocket.emit("setup", user);

    newSocket.on("connected", () => {
      console.log("Socket is connected!");
    });

    newSocket.on("getOnlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    // Cleanup on component unmount or user change
    return () => {
      if (newSocket) {
        newSocket.disconnect();
        console.log("Socket disconnected!");
      }
    };
  }, [user]);

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};
