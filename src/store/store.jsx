import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import chatSlice from "./reducers/chatSlice";
import messageSlice from "./reducers/messageSlice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    chatReducer: chatSlice,
    messageReducer: messageSlice,
  },
});
