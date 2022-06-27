

import { startLoading, showSuccess, showError } from "./statusActions";
import { IloginAdminProps } from "../../types/loginAdminProps";

import adminApi from '../../api/adminApi'
import { Add_ADMIN, DELETE_ADMIN, GET_ALL_ADMINS } from "./actionTypes";
import { IdataAdminInformation } from "../../types/dataAdminInformation";

export const addAdmin = (data:IloginAdminProps ) => (dispatch: any) => {
  const {token} = JSON.parse(`${localStorage.getItem("userInf")}`);

  const config={
    headers:{
     'Content-Type':'application/json',
     Authorization:` Bearer ${token}`
    }
  }
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
  const {token} = JSON.parse(`${localStorage.getItem("userInf")}`);

  const config={
    headers:{
     'Content-Type':'application/json',
     Authorization:` Bearer ${token}`
    }
  }
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
export const deleteAdmin=(id:string)=>(dispatch:any)=>{
  const {token} = JSON.parse(`${localStorage.getItem("userInf")}`);

  const config={
    headers:{
     'Content-Type':'application/json',
     Authorization:` Bearer ${token}`
    }
  }

  dispatch(startLoading())
  adminApi.delete(`/${id}`,config).then((response)=>{
  dispatch(deleteAdminSuccess(response.data))
  dispatch(showSuccess())
  localStorage.setItem("check","true")
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
export const deleteAdminSuccess=(id:string)=>({

  type:DELETE_ADMIN,
  payload:id
})