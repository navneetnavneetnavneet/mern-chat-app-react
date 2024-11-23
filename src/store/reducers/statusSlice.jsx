import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allStatus: [],
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setAllStatus: (state, action) => {
      state.allStatus = action.payload;
    },
  },
});

export const { setAllStatus } = statusSlice.actions;
export default statusSlice.reducer;
