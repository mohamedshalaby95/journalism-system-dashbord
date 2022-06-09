import axios from "axios";
export const subCategoyApi = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}api/subcategories`,
});
