import { setChats, setSelectedChat } from "../reducers/chatSlice";
import axios from "../../utils/axios";

export const asyncAccessChat = (userId) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/chats", { userId });
    if (data) {
      await dispatch(setSelectedChat(data));
      await asyncFetchAllChats();
      return { chatId: data._id };
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};

export const asyncFetchAllChats = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/chats");
    if (data) {
      await dispatch(setChats(data));
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};

export const asyncCreateGroup =
  ({ chatName, users }) =>
  async (dispatch, getState) => {
    try {
      const { chats } = getState().chatReducer;
      const { data } = await axios.post("/chats/create-group", {
        chatName,
        users,
      });
      if (data) {
        await dispatch(setChats([data, ...chats]));
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

export const asyncRenameGroup =
  (chatId, chatName) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/chats/rename-group", {
        chatId,
        chatName,
      });
      if (data) {
        await dispatch(setSelectedChat(data));
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

export const asyncAddUserToGroup =
  (chatId, userId) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/chats/add-user-group", {
        chatId,
        userId,
      });
      if (data) {
        await dispatch(setSelectedChat(data));
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

export const asyncRemoveUserFromGroup =
  (chatId, userId) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/chats/remove-user-group", {
        chatId,
        userId,
      });
      if (data) {
        await dispatch(setSelectedChat(data));
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

export const asyncExitUserFromGroup =
  (chatId) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/chats/exit-user-group", {
        chatId,
      });
      if (data) {
        await dispatch(setSelectedChat(null));
        await dispatch(asyncFetchAllChats());
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };
