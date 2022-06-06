import { LOGIN_ADMIN_SUCCUSE, LOGOUT_ADMIN } from "./actionTypes";
import loginApi from "../../api/loginAdminApi";


import { startLoading, showSuccess, showError } from "./statusActions";
import { IloginAdminProps } from "../../types/loginAdminProps";
import { IdataFromLogin } from "../../types/dataFromLogin";

export const loginAdmin = (data:IloginAdminProps ) => (dispatch: any) => {
  dispatch(startLoading());
  loginApi
    .post("", data)
    .then((response) => {
      dispatch(loginAdminSuccess(response.data));
      dispatch(showSuccess());
      localStorage.setItem("userInf", JSON.stringify(response.data));
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
    });
};

export const loginAdminSuccess = (users: IdataFromLogin) => ({
  type: LOGIN_ADMIN_SUCCUSE,
  payload: users,
});

export const userLogout = () => (dispatch: any) => {
  localStorage.removeItem("userInf");
  dispatch({ type: LOGOUT_ADMIN });
};
