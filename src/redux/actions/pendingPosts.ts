import { pendingPostsApi } from './../../api/posts';




import {GET_PENDING_POSTS,ACCEPT_PENDING_POST, CANCEL_PENDING_POST} from './actionTypes';
import{startLoading,showError,showSuccess} from './statusActions';
import { ToastContainer, toast } from "react-toastify";
const notify = (input: string) => toast(input);
const {token} = JSON.parse(`${localStorage.getItem("userInf")}`);

const config={
  headers:{
   'Content-Type':'application/json',
   Authorization:` Bearer ${token}`
  }
}
export const getPendingPosts=()=>(dispatch:any)=>{
  dispatch(startLoading())
  pendingPostsApi.get('status/pending',config).then(res=>{
    {
        dispatch(getPendingPostSuccese(res.data))
        dispatch(showSuccess())
       
        
      }
  })  .catch((err) => {
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

const getPendingPostSuccese=(data:any)=>({type:GET_PENDING_POSTS,payload:data})

// ----------------------------accept post---------------------
export const  acceptPost=(id:string)=>(dispatch:any)=>{
  dispatch(startLoading()) 
   pendingPostsApi.get(`admin/accept/${id}`,config).then((res)=>{
     dispatch(acceptPostSuccess(res.data))
     dispatch(showSuccess())
     notify("Post Accept Succssfuly");
   }) .catch((err) => {
    dispatch(
      showError(
        err.response.status,
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
    notify("something go wrong when accept post");
  });

}

const acceptPostSuccess=(id:string)=>({type:ACCEPT_PENDING_POST,payload:id})

///-------------------------------delete pending post-----------------------------------
export const  cancelPendingPost=(id:string)=>(dispatch:any)=>{
  dispatch(startLoading()) 
   pendingPostsApi.get(`admin/cancel/${id}`,config).then((res)=>{
     dispatch(cancelPendingSuccess(res.data))
     dispatch(showSuccess())
     notify("Post Cancel Succssfuly");
   }) .catch((err) => {
    dispatch(
      showError(
        err.response.status,
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
    notify("something go wrong when cancel post");
  });

}

const cancelPendingSuccess=(id:string)=>({type:CANCEL_PENDING_POST,payload:id})

