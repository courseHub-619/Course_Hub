import * as types from "../types";
const initialState = {
    id : null,

    loading : false,
    error : null,
};

export default function (state = initialState, action) {

    const { type, payload } = action;
    switch (type) {
		case CHANGE_ID:
			return {
				...state,
				
				loading: false,
				id: payload,
			};
            default:
                return state;

}