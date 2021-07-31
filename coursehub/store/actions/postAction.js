import * as types from "../types";


export const fetchposts = () => async dispatch => {
    dispatch({
        type: types.GET_POST,
        payload: ['1st post','2nd post','3rd post','4th post']
    })
}
