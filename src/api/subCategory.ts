import axios from "axios";
export const subCategoyApi = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}api/subcategories`,
});
