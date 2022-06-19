import { combineReducers } from "redux";
import categoryReducer from "./CategoryReducer";
import statusReducer from "./statusReducer";
import { adminLoginReducer } from "./loginAdminReducer";
import adminReducer from "./adminReducer";
import subCategoryReducer from "./SubCategoryReducer";
import { userReducer } from "./userReducer";
import {pendingPostsReducer} from './pendingPostsRedducer'
import {getPostReducer} from './getPostReducer'

const rootReducer = combineReducers({
  status: statusReducer,
  category: categoryReducer,
  adminData: adminLoginReducer,
  admins: adminReducer,
  subCategory: subCategoryReducer,
  users:userReducer,
  pendingPosts:pendingPostsReducer,
  post:getPostReducer
});
export type RootState = ReturnType<any>;

export default rootReducer;
