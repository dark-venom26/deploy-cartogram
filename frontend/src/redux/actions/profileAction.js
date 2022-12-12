import { 
    UPDATE_PROFILE_REQUEST, 
    UPDATE_PROFILE_FAIL, 
    UPDATE_PROFILE_SUCCCESS,
    UPDATE_PASSWORD_REQUEST, 
    UPDATE_PASSWORD_FAIL, 
    UPDATE_PASSWORD_SUCCCESS,
    CLEAR_ERRORS
} from "../constants/profileConstants";

import axios from "axios";

export const updateProfile = (userData) => async (dispatch)=> {
    try{
        dispatch({type: UPDATE_PROFILE_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        
        const {data} = await axios.put(`/api/v1/me/update`, userData, config)

        dispatch({type: UPDATE_PROFILE_SUCCCESS, payload: data.success})

    }catch(error){
        dispatch({type: UPDATE_PROFILE_FAIL, payload: error.response})
    }
}

export const updatePassword = (passwords) => async (dispatch)=> {
    try{
        dispatch({type: UPDATE_PASSWORD_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        
        const {data} = await axios.put(`/api/v1/password/update`, passwords, config)

        dispatch({type: UPDATE_PASSWORD_SUCCCESS, payload: data.success})

    }catch(error){
        dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.response})
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:  CLEAR_ERRORS
    })
} 
