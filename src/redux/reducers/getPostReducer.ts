import { IreducerActionsProps } from "../../types/reducerPropsAction";
import { GET_POST } from "../actions/actionTypes";

export const getPostReducer = (
  state = {},
  { type, payload }: IreducerActionsProps
) => {
  switch (type) {
    case GET_POST :
      return payload;

    default:
      return state;
  }
};
