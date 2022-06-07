

import { startLoading, showSuccess, showError } from "./statusActions";
import { IloginAdminProps } from "../../types/loginAdminProps";

import adminApi from '../../api/adminApi'
import { Add_ADMIN, GET_ALL_ADMINS } from "./actionTypes";
import { IdataAdminInformation } from "../../types/dataAdminInformation";
const config={
  headers:{
   'Content-Type':'application/json',
   Authorization:` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjllNWMxY2U1ZTRiYTI4MjNhNmNhM2IiLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImlhdCI6MTY1NDU0NTQzN30.Wl2oWNZCpsK1qUCncmCtL28ZAIipiR_oyrrg4vE7zgM`
  }
}

export const addAdmin = (data:IloginAdminProps ) => (dispatch: any) => {
  // const {token}=JSON.parse(localStorage.getItem('userInf'))
  dispatch(startLoading());


  adminApi
    .post("", data,config)
    .then((response) => {
      dispatch(addAdminSuccess(response.data));
      dispatch(showSuccess());
   
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

export const addAdminSuccess = (admin: IdataAdminInformation) => ({
  type: Add_ADMIN,
  payload:admin,
});

export const getAllAdmin=()=>(dispatch:any)=>{
dispatch(startLoading())

adminApi.get("",config).then((response)=>{
  dispatch(getAllAdminSucces(response.data))
  dispatch(showSuccess())
}).catch((err)=>{
  dispatch(
    showError(
      err.response.status,
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    )
  );
})
}

export const getAllAdminSucces=(admins:IdataAdminInformation)=>({
  type: GET_ALL_ADMINS,
  payload:admins,
}
)