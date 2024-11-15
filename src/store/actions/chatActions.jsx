import { setChats, setSelectedChat } from "../reducers/chatSlice";
import axios from "../../utils/axios";

export const asyncAccessChat = (userId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/chats", { userId });
    if (data) {
      dispatch(setSelectedChat(data));
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};

export const asyncFetchAllChats = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/chats");
    if (data) {
      dispatch(setChats(data));
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};
