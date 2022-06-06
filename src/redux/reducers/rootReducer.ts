import { combineReducers } from "redux";
import statusReducer from "./statusReducer";
import {adminLoginReducer} from './loginAdminReducer'

const rootReducer = combineReducers({
	status: statusReducer,
	adminData:adminLoginReducer
});

export default rootReducer;