import { combineReducers } from "redux";
import categoryReducer from "./CategoryReducer";
import statusReducer from "./statusReducer";
import {adminLoginReducer} from './loginAdminReducer'
import  adminReducer  from './adminReducer'

const rootReducer = combineReducers({
	status: statusReducer,
	category: categoryReducer,
	adminData:adminLoginReducer,
	admins:adminReducer
});
export type RootState = ReturnType<any>

export default rootReducer;