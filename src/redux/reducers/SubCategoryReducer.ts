import {
  ADD_SUB_CATEGORY,
  DELETE_SUB_CATEGORY,
  FETCH_SUB_CATEGORY,
  UPDATE_SUB_CATEGORY,
} from "../actions/actionTypes";

const initState = {
  // loading: false,
  data: [],
  // error: "",
};

const subCategoryReducer = (state = initState, action: any) => {
  switch (action.type) {
    case ADD_SUB_CATEGORY:
      return {
        data: [...state.data, action.payload],
      };
    case FETCH_SUB_CATEGORY:
      return {
        data: [...action.payload],
      };
    case DELETE_SUB_CATEGORY:
      return {
        data: state.data.filter(({ _id }) => _id !== action.payload),
      };
    case UPDATE_SUB_CATEGORY:
      return {
        data: state.data.map((subCategory: any) => {
          if (subCategory._id === action.payload._id) {
            return action.payload;
          }
          return subCategory;
        }),
      };
    default:
      return state;
  }
};

export default subCategoryReducer;
