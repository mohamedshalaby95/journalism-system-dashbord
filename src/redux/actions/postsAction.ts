import { IPost } from "../../types/posts";
import { DELETE_POST, FETCH_POSTS } from "./actionTypes";
import { showError, showSuccess, startLoading } from "./statusActions";
import PostsApi from "../../api/postsApi";
import { toast } from "react-toastify";

const notify = (input: string) => toast(input);
const data = JSON.parse(`${localStorage.getItem("userInf")}`);
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${data.token}`,
  },
};

export const fetchPostsAction = (data: [IPost]) => {
  return {
    type: FETCH_POSTS,
    payload: data,
  };
};
//we have to give a dispatch a datatype
export const fetchPosts = () => (dispatch: any) => {
  const userInf = JSON.parse(`${localStorage.getItem("userInf")}`);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInf.token}`,
    },
  };

  dispatch(startLoading());
  PostsApi.get("/admin/all", config)
    .then((data) => {
      dispatch(showSuccess());
      dispatch(fetchPostsAction(data.data));
    })
    .catch((error) => {
      dispatch(showError(error.response.status, error.message));
    });
};

// DELETE POST ACTION CRAATOR
export const deletePostAction = (data: [IPost]) => {
  return {
    type: DELETE_POST,
    payload: data,
  };
};
// delete function
export const deletePost = (id: string) => (dispatch: any) => {
  dispatch(startLoading());
  PostsApi.delete(`/delete/${id}`, config)
    .then((data) => {
      dispatch(showSuccess());
      dispatch(deletePostAction(data.data));
      console.log("from delete action ", data.data);
      notify("Post Deleted suuccefully");
    })
    .catch((error) => {
      console.log(error);
      dispatch(showError(error.response?.status, error.message));
      notify("Something went wrong");
    });
};
