import axios from "axios";
import { IreducerActionsProps } from "../../types/reducerPropsAction";
import { categoryApi } from "../../api/category";
import { ToastContainer, toast } from "react-toastify";

import {
  ADD_CATEGORY_SUCCESS,
  // FETCH_CATEGORY_FAILURE,
  // FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
} from "./actionTypes";
import { showSuccess, showError, startLoading } from "./statusActions";
import {
  DELETE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
} from "./actionTypes";
import { Icategory } from "../../types/category";
// export function fetchCategoryRequest() {
//   return {
//     type: FETCH_CATEGORY_REQUEST,
//   };
// }
const notify = (input: string) => toast(input);

//back
export function fetchCategorySuccess(data: any) {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload: data,
  };
}
//back

// export function fetchCategoryFailure(error: any) {
//   return {
//     type: FETCH_CATEGORY_FAILURE,
//     payload: error,
//   };
// }

export const FetchCategories = () => {
  return (dispatch: any) => {
    dispatch(startLoading());
    categoryApi
      .get("")
      .then((res) => {
        return res.data;
      })
      .then((filterd) => dispatch(fetchCategorySuccess(filterd)))
      .catch((error) => {
        dispatch(showError(error, "Fuck World"));
      });
  };
};

// _________________delete  Actions _____________________

// export function deleteCategoryRequest() {
//   return {
//     type: DELETE_CATEGORY_REQUEST,
//   };
// }

//back
export function deleteCategorySuccess(data: string) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: data,
  };
}
//back

// export function deleteCategoryFailure(error: any) {
//   return {
//     type: DELETE_CATEGORY_FAILURE,
//     payload: error,
//   };
// }

export const deleteCategory = (id: string) => {
  return (dispatch: any) => {
    dispatch(startLoading());
    categoryApi
      .delete(`${id}`)
      .then((res) => {
        dispatch(deleteCategorySuccess(id));
        dispatch(showSuccess());
      })
      .catch((error) => {
        dispatch(showError(error, "fuck you"));
      });
  };
};

export function updateCategorySuccess(category: Icategory) {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    payload: category,
  };
}

export const UpdateCategory = (category: Icategory, title: string,description:string,image:string) => {
  return (dispatch: any) => {
    dispatch(startLoading());
    categoryApi
      .put(`${category._id}`, { title,description,image })
      .then((res) => {
        dispatch(updateCategorySuccess({ ...res.data, title,description,image }));
        dispatch(showSuccess());
        notify("category Updated suuccefully");
      })
      .catch((error) => {
        dispatch(showError(error , "kosom menna"));
        notify("something went wrong");
      });
  };
};

export function addCategorySuccess(category: Icategory) {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: category,
  };
}
export const addCategory = (title: string,description:string,image:string) => {
  return (dispatch: any) => {
    dispatch(startLoading());
    categoryApi
      .post("", { title,description,image })
      .then((res) => {
        dispatch(addCategorySuccess(res.data));
        dispatch(showSuccess());
        notify("category added suuccefully");
      })
      .catch((error) => {
        dispatch(showError(error , "fuck hamody"));
        notify("something went wrong");
      });
  };
};

