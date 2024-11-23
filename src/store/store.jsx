import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";
import chatSlice from "./reducers/chatSlice";
import messageSlice from "./reducers/messageSlice";
import statusSlice from "./reducers/statusSlice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice,
    chatReducer: chatSlice,
    messageReducer: messageSlice,
    statusReducer: statusSlice,
  },
});
