import { IreducerActionsProps } from "../../types/reducerPropsAction";
import { ACCEPT_PENDING_POST, DELETE_PENDING_POST, GET_PENDING_POSTS } from "../actions/actionTypes";

export const pendingPostsReducer = (
  state = [],
  { type, payload }: IreducerActionsProps
) => {
  switch (type) {
    case GET_PENDING_POSTS:
      return payload;

      case ACCEPT_PENDING_POST:
        return state?.filter((el:any)=> el._id!==payload);

        case  DELETE_PENDING_POST:
          return state?.filter((el:any)=> el._id!==payload);
         
      

    default:
      return state;
  }
};
