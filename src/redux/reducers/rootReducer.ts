import { combineReducers } from "redux";
import statusReducer from "./statusReducer";
import {adminLoginReducer} from './loginAdminReducer'
import  adminReducer  from './adminReducer'

const rootReducer = combineReducers({
	status: statusReducer,
	adminData:adminLoginReducer,
	admins:adminReducer
});

export default rootReducer;