import { combineReducers } from "redux";
import categoryReducer from "./CategoryReducer";
import statusReducer from "./statusReducer";
import { adminLoginReducer } from "./loginAdminReducer";
import adminReducer from "./adminReducer";
import subCategoryReducer from "./SubCategoryReducer";

const rootReducer = combineReducers({
  status: statusReducer,
  category: categoryReducer,
  adminData: adminLoginReducer,
  admins: adminReducer,
  subCategory: subCategoryReducer,
});
export type RootState = ReturnType<any>;

export default rootReducer;
