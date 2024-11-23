import { setAllStatus } from "../reducers/statusSlice";
import axios from "../../utils/axios";

export const asyncFetchAllStatus = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/status/");
    if (data) {
      dispatch(setAllStatus(data));
    }
  } catch (error) {
    console.log(error.response?.data);
  }
};
