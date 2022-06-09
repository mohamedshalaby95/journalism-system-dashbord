import { ICategoryAction } from "../../types/category";
import {
  ADD_CATEGORY_SUCCESS,
  FETCH_CATEGORY_SUCCESS,
} from "../actions/actionTypes";
import { DELETE_CATEGORY_SUCCESS } from "../actions/actionTypes";
import { UPDATE_CATEGORY_SUCCESS } from "../actions/actionTypes";
const initState = {
  loading: false,
  data: [],
  error: "",
};

const categoryReducer = (state = initState, action: ICategoryAction) => {
  switch (action.type) {
    // case FETCH_CATEGORY_REQUEST:
    //   return {
    //     loading: true,
    //     error: "",
    //     data: [],
    //   };
    case FETCH_CATEGORY_SUCCESS:
      return {
        data: action.payload,
      };
    // case FETCH_CATEGORY_FAILURE:
    //   return {
    //     loading: false,
    //     error: "",
    //     data: action.payload,
    //   };
    // case DELETE_CATEGORY_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: ""
    //   };
    case DELETE_CATEGORY_SUCCESS: {
      return {
        loading: false,
        error: "",

        data: (state as any).data.filter(
          (element: any) => element._id !== action.payload
        ),
      };
    }
    case UPDATE_CATEGORY_SUCCESS: {
      return {
        data: (state as any).data.map((element: any) => {
          if (element._id === action.payload._id) {
            return action.payload;
          }
          return element;
        }),
      };
    }
    case ADD_CATEGORY_SUCCESS: {
      return {
        data: [...state.data, action.payload],
      };
    }
    // case DELETE_CATEGORY_FAILURE:
    //   {console.log("payload here error")
    //   return {
    //     ...state,
    //     loading: false,
    //     error: ""

    //   };
    // }
    default:
      return state;
  }
};

export default categoryReducer;
