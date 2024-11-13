import { loadUser, removeUser } from "../reducers/userSlice";
import axios from "../../utils/axios";

export const asyncLoadUser = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/users/current");
    if (data) {
      dispatch(loadUser(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncSignUpUser =
  ({ fullName, email, password, gender }) =>
  async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/users/signup", {
        fullName,
        email,
        password,
        gender,
      });
      if (data) {
        dispatch(asyncLoadUser());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
