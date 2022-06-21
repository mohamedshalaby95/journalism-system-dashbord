import {IreducerActionsProps} from '../../types/reducerPropsAction'
import {GET_ALL_USERS} from '../actions/actionTypes'

export const userReducer=(state=[],{type,payload}:IreducerActionsProps)=>{

    switch(type){
        case GET_ALL_USERS:
               return payload;
        

        default:
            return state
    }

}