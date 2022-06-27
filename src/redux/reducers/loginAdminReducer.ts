import {IreducerActionsProps} from '../../types/reducerPropsAction'
import { LOGIN_ADMIN_SUCCUSE ,LOGOUT_ADMIN} from '../actions/actionTypes'


export const  adminLoginReducer=(state=null,{type,payload}:IreducerActionsProps)=>{
    switch(type){
     
        case LOGIN_ADMIN_SUCCUSE : 
        {
            return payload
        }
      
        case LOGOUT_ADMIN: return(null)

        default :return state
    }


}