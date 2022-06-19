import { IreducerActionsProps } from "../../types/reducerPropsAction";
import { ADD_POST } from "./../actions/actionTypes";

const postReducer = (state = [], { type, payload }: IreducerActionsProps) => {
  switch (type) {
    case ADD_POST:
      return [payload, ...state];

    default:
      return state;
  }
};

export default postReducer;
