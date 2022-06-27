import axios from "axios";
export const categoryApi = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/api/categories`,
});
