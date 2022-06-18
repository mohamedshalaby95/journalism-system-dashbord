import axios from "axios";
export const postApi = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/posts`,
});
