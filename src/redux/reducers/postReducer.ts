import { IPost } from "../../types/posts";
import { IreducerActionsProps } from "../../types/reducerPropsAction";
import { FETCH_POSTS, DELETE_POST } from "../actions/actionTypes";

import { ADD_POST } from "./../actions/actionTypes";
const initialState = {
  data: [],
};

const postReducer = (
  state = initialState,
  { type, payload }: IreducerActionsProps
) => {
  switch (type) {
    case ADD_POST:
      return [payload, ...state.data];

    case FETCH_POSTS:
      return {
        data: [...payload],
      };

    case DELETE_POST:
      return {
        data: state.data.filter((post: IPost) => {
          console.log(post._id, payload._id);
         console.log(post._id === payload)
          return post._id !== payload;
        }),
      };

    default:
      return state;
  }
};

export default postReducer;
