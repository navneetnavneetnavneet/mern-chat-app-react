import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
});

export const { setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
