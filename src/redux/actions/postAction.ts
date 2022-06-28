import { startLoading, showSuccess, showError } from "./statusActions";
import { ToastContainer, toast } from "react-toastify";

import { postApi } from "../../api/post";
import { ADD_POST, UPDATE_POST } from "./actionTypes";
import { IdataPostInformation } from "../../types/dataPostInformation";
import Posts from "../../pages/posts/Posts";
const data = JSON.parse(`${localStorage.getItem("userInf")}`);
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: ` Bearer ${data.token}`,
  },
};
const notify = (input: string) => toast(input);
export const addPost = (data: any) => (dispatch: any) => {
  // const {token}=JSON.parse(localStorage.getItem('userInf'))
  dispatch(startLoading());

  postApi
    .post("/add", data, config)
    .then((response) => {
      dispatch(addPostSuccess(response.data));
      dispatch(showSuccess());
      notify("Post Updated suuccefully");
    })
    .catch((err) => {
      dispatch(
        showError(
          err.response?.status,
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
      );
      notify("something went wrong");
    });
};

export const addPostSuccess = (post: IdataPostInformation) => ({
  type: ADD_POST,
  payload: post,
});
export const updatePostSuccess = (post: IdataPostInformation) => ({
  type: UPDATE_POST,
  payload: post,
});

export const updatePost = (post: IdataPostInformation) => (dispatch: any) => {
  dispatch(startLoading());
  postApi
    .put("/update", post)
    .then((response) => {
      dispatch(updatePostSuccess(response.data));
      dispatch(showSuccess());
      notify("Post Updated");
    })
    .catch((err) => {
      dispatch(
        showError(
          err.response.status,
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )
      );
      notify("something went wrong");
    });
};
