import { combineReducers } from "redux";
import categoryReducer from "./CategoryReducer";
import statusReducer from "./statusReducer";

const rootReducer = combineReducers({
	status: statusReducer,
	category: categoryReducer
});
export type RootState = ReturnType<any>

export default rootReducer;