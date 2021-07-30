import * as types from "../types";
import axios from 'axios';


export const currentUserId = (id) => async dispatch => {
 
        dispatch({
            type: types.CHANGE_ID,
            payload: id
        })
    }
  

