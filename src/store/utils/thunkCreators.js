import axios from "axios";
import { gotUsers } from "../users";

export const getRandomUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`https://randomuser.me/api/?results=100`);
    dispatch(gotUsers(data));
  } catch (error) {
    console.error(error);
  }
};
