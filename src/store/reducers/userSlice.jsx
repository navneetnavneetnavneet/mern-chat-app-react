import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  allUser: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    removeUser: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setAllUser: (state, action) => {
      state.allUser = action.payload;
    },
  },
});

export const { loadUser, removeUser, setAllUser } = userSlice.actions;
export default userSlice.reducer;
