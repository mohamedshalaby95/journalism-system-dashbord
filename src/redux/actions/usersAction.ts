import { useSelector } from 'react-redux';
import {startLoading,showError,showSuccess} from "../actions/statusActions"
import {GET_ALL_USERS} from './actionTypes'
import userApi from '../../api/usersApi'


export const getUser=()=>(dispatch:any)=>{
 
  const {token} = JSON.parse(`${localStorage.getItem("userInf")}`);
  console.log(token)
  const config={
    headers:{
     'Content-Type':'application/json',
     Authorization:` Bearer ${token}`
    }
  }
dispatch(startLoading())
    userApi.get("",config).then((res)=>{
        dispatch(getUserSuccess(res.data))
        dispatch(showSuccess())
    }).catch((err)=>{

  dispatch(showError( err.response.status,
    err.response && err.response.data.message
      ? err.response.data.message
      : err.message))
    })

}


export const getUserSuccess=(users:any)=>({type:GET_ALL_USERS,payload:users})


