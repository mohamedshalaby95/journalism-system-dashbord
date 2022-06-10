import { combineReducers } from "redux";
import categoryReducer from "./CategoryReducer";
import statusReducer from "./statusReducer";
import { adminLoginReducer } from "./loginAdminReducer";
import adminReducer from "./adminReducer";
import subCategoryReducer from "./SubCategoryReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  status: statusReducer,
  category: categoryReducer,
  adminData: adminLoginReducer,
  admins: adminReducer,
  subCategory: subCategoryReducer,
  users:userReducer
});
export type RootState = ReturnType<any>;

export default rootReducer;
