import {
  ADD_SUB_CATEGORY,
  DELETE_SUB_CATEGORY,
  FETCH_SUB_CATEGORY,
  UPDATE_SUB_CATEGORY,
} from "./actionTypes";

import { subCategoyApi } from "../../api/subCategory";
import { showError, startLoading } from "./statusActions";
import { toast } from "react-toastify";
const notify = (input: string) => toast(input);

export function addSubCategoryAction(data: any) {
  return {
    type: ADD_SUB_CATEGORY,
    payload: data,
  };
}
export function fetchSubCategoryAction(data: any) {
  return {
    type: FETCH_SUB_CATEGORY,
    payload: data,
  };
}
export function deleteSubCategoryAction(data: any) {
  return {
    type: DELETE_SUB_CATEGORY,
    payload: data,
  };
}
export function updateSubCategoryAction(data: any) {
  return {
    type: UPDATE_SUB_CATEGORY,
    payload: data,
  };
}
export const addSubCategory = ({
  title,
  parent,
}: {
  title: string;
  parent: string;
}) => {
  return (dispatch: any) => {
    dispatch(startLoading());
    subCategoyApi
      .post("", { title, parent })
      .then((res) => {
        dispatch(addSubCategoryAction(res.data));
        notify("sub category added succssfuly");
      })
      .catch((error) => {
        dispatch(showError(error, "something went wrong in add sub category"));
        notify("something went wrong on add sub category");
      });
  };
};

export const fetchSubCategory = () => {
  return (dispatch: any) => {
    dispatch(startLoading());
    subCategoyApi
      .get("")
      .then((res) => {
        dispatch(fetchSubCategoryAction(res.data));
      })
      .catch((error) => {
        dispatch(showError(error, "something went wrong"));
      });
  };
};

export const deleteSubCategory = (id: string) => {
  return (dispatch: any) => {
    dispatch(startLoading());
    subCategoyApi
      .delete(`${id}`)
      .then((res) => {
        dispatch(deleteSubCategoryAction(res.data._id));

        notify("sub category deleted succssfuly");
      })
      .catch((error) => {
        dispatch(showError(error, "something went wrong"));
        notify("something went wrong on delete sub category");
      });
  };
};
export const updateSubCategory = (id: string,body:{title:string , parent:string}) => {
  return (dispatch: any) => {
    dispatch(startLoading());
    subCategoyApi
      .put(`${id}`,body)
      .then((res) => {
        dispatch(updateSubCategoryAction({...res.data, title:body.title , parent:body.parent}));
        notify("sub category Updated succssfuly");
      })
      .catch((error) => {
        dispatch(showError(error, "something went wrong"));
        notify("something went wrong on update sub category");
      });
  };
};
