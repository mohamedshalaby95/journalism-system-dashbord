import { START_LOADING, SHOW_SUCCESS, SHOW_ERROR } from "../actions/actionTypes";
import {IreducerActionsProps} from '../../types/reducerPropsAction'

const initialState = {
	loading: false,
	hasError: false,
	errorStatus: null,
	success:false
};

const statusReducer = (state = initialState, { type, payload }:IreducerActionsProps) => {
	switch (type) {
		case START_LOADING:
			return {
				...state,
				loading: true,
				success:false

			};
		case SHOW_SUCCESS:
			return {
				...state,
				loading: false,
				hasError: false,
				errorStatus: null,
				success:true
			};
		case SHOW_ERROR:
			return {
				...state,
				loading: false,
				hasError: true,
				errorStatus: payload,
				success:false
			};
		default:
			return state;
	}
};

export default statusReducer;
