import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
  chats: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export const { setSelectedChat, setChats } = chatSlice.actions;
export default chatSlice.reducer;
