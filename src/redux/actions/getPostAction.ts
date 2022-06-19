import { pendingPostsApi } from '../../api/posts'
import {GET_POST} from './actionTypes'
import {showSuccess,showError,startLoading} from './statusActions'
const {token} = JSON.parse(`${localStorage.getItem("userInf")}`);
const config={
    headers:{
     'Content-Type':'application/json',
     Authorization:` Bearer ${token}`
    }
  }
export const  getPost=(id:any)=>(dispatch:any)=>{
       dispatch(startLoading())
       pendingPostsApi.get(`/get_one/${id}`,config).then((res)=>{

        dispatch(getPostSuccess(res.data))
       dispatch(showSuccess()) 
       }).catch((err) => {
        dispatch(
          showError(
            err.response.status,
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message
          )
        );
      });
}

const getPostSuccess=(post:any)=>({type:GET_POST,payload:post})