import { IPost } from "../../types/posts";
import { IreducerActionsProps } from "../../types/reducerPropsAction";
import { FETCH_POSTS, DELETE_POST } from "../actions/actionTypes";

const initialState = {
  data: [],
};

const postReducer = (
  state = initialState,
  { type, payload }: IreducerActionsProps
) => {
  switch (type) {
    case FETCH_POSTS:
      return {
        data: [...payload],
      };

    case DELETE_POST:
     { 
      console.log( payload._id);

   
      return {
        data: state.data.filter((post: IPost) => {
          console.log(post._id, payload._id);
          return post._id !== payload._id;
        }),
      };
    }

    default:
      return state;
  }
};

export default postReducer;
