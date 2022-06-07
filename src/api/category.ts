import axios from "axios";
export const categoryApi = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}api/categories`,
});
