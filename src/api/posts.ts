import axios from "axios";
export const pendingPostsApi = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND}/posts`,
});
