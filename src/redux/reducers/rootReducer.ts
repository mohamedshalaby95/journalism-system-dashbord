import { combineReducers } from "redux";

import statusReducer from "./statusReducer";

const rootReducer = combineReducers({
	status: statusReducer,
});

export default rootReducer;