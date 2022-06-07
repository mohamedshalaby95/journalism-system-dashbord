import { IreducerActionsProps } from '../../types/reducerPropsAction';
import { Add_ADMIN , GET_ALL_ADMINS} from './../actions/actionTypes';



const adminReducer = (state = [], { type, payload }:IreducerActionsProps) => {
	switch (type) {
		case GET_ALL_ADMINS:
			return payload;
		
		case Add_ADMIN:
			return [payload, ...state];
		default:
			return state;
	}
};

export default adminReducer;