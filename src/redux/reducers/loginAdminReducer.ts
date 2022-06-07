import {IreducerActionsProps} from '../../types/reducerPropsAction'
import { LOGIN_ADMIN_SUCCUSE ,LOGOUT_ADMIN} from '../actions/actionTypes'


export const  adminLoginReducer=(state={},{type,payload}:IreducerActionsProps)=>{
    switch(type){
     
        case LOGIN_ADMIN_SUCCUSE : return({...state,loading:false,userInf:payload})
      
        case LOGOUT_ADMIN: return({})

        default :return {...state}
    }


}