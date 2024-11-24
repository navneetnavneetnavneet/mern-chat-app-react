import { loadUser, removeUser, setAllUser } from "../reducers/userSlice";
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

export const asyncSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/users/signin", {
        email,
        password,
      });
      if (data) {
        dispatch(asyncLoadUser());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncSignOutUser = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/users/signout");
    if (data) {
      dispatch(removeUser());
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncEditProfile =
  ({ fullName, email, gender, profileImage }) =>
  async (dispatch, getState) => {
    try {
      const { data } = await axios.post(
        "/users/edit",
        {
          fullName,
          email,
          gender,
          profileImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data) {
        dispatch(removeUser());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncFetchAllUser = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/users/");
    if (data) {
      dispatch(setAllUser(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
