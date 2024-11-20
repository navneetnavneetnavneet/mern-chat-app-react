import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

export const socketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    let newSocket;
    if (user) {
      newSocket = io("http://localhost:8080");
      setSocket(newSocket);
    }

    if (socket) {
      socket.emit("setup", user);
      socket.on("connected", () => {
        console.log("socket is connected !");
      });
    }
  }, [user]);

  return (
    <socketContext.Provider value={{ socket, setSocket }}>
      {children}
    </socketContext.Provider>
  );
};
