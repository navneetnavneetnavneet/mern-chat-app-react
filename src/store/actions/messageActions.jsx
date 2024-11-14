import { setMessages } from "../reducers/messageSlice";
import axios from "../../utils/axios";

export const asyncFetchAllMessages = (chatId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/messages/${chatId}`);
    if (data) {
      dispatch(setMessages(data));
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};
