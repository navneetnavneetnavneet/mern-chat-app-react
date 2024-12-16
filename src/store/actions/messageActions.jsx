import { setMessages } from "../reducers/messageSlice";
import axios from "../../utils/axios";

export const asyncFetchAllMessages = (chatId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/messages/${chatId}`);
    if (data) {
      await dispatch(setMessages(data));
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};

export const asyncSendMessage =
  (chatId, content) => async (dispatch, getState) => {
    try {
      const { messages } = getState().messageReducer;
      const { data } = await axios.post(`/messages/send-message`, {
        chatId,
        content,
      });
      if (data) {
        await dispatch(setMessages([...messages, data]));
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };
