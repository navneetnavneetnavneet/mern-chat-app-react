import { loadUser, removeUser, setAllUser } from "../reducers/userSlice";
import axios from "../../utils/axios";

export const asyncLoadUser = () => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get("/users/current");
    if (data && status === 200) {
      await dispatch(loadUser(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncSendOtp = (email) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.post("/users/send-otp", { email });
    console.log(data);

    if (data && status === 200) {
      return data.otp;
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncSignUpUser =
  ({ fullName, email, password, gender, dateOfBirth, otp }) =>
  async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post("/users/signup", {
        fullName,
        email,
        password,
        gender,
        dateOfBirth,
        otp,
      });
      if (data && status === 201) {
        await dispatch(asyncLoadUser());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post("/users/signin", {
        email,
        password,
      });
      if (data && status === 200) {
        await dispatch(asyncLoadUser());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncSignOutUser = () => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get("/users/signout");
    if (data && status === 200) {
      await dispatch(removeUser());
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncForgotPassword = (email) => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.post("/users/forgot-password", {
      email,
    });

    if (data && status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const asyncResetPassword =
  (password, resetToken) => async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post(
        `/users/reset-password/${resetToken}`,
        { password }
      );

      if (data && status === 200) {
        return data;
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncEditProfile =
  ({ fullName, email, gender, dateOfBirth, profileImage }) =>
  async (dispatch, getState) => {
    try {
      const { data, status } = await axios.post(
        "/users/edit",
        {
          fullName,
          email,
          gender,
          dateOfBirth,
          profileImage,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data && status === 200) {
        await dispatch(asyncLoadUser());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

export const asyncFetchAllUser = () => async (dispatch, getState) => {
  try {
    const { data, status } = await axios.get("/users/");
    if (data && status === 200) {
      await dispatch(setAllUser(data));
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
