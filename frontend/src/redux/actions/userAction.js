import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_REQUEST,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    UPDATE_USER,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_FAIL,
    FORGET_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    ALL_TODAYS_USERS_REQUEST,
    ALL_TODAYS_USERS_SUCCESS,
    ALL_TODAYS_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOGOUT,
    RAISE_ERRORS,
    CLEAR_ERRORS  
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch)=> {
    try{
        dispatch({type: LOGIN_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        
        const {data} = await axios.post(`/api/v1/login`, {email,password}, config)

        dispatch({type: LOGIN_SUCCESS, payload: data.user})

    }catch(error){
        dispatch({type: LOGIN_FAIL, payload: error.response})
    }
}

export const register = (userData) => async (dispatch)=> {
    try{
        dispatch({type: REGISTER_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        
        const {data} = await axios.post(`/api/v1/register`, userData, config)

        dispatch({type: REGISTER_SUCCESS, payload: data.user})

    }catch(error){
        dispatch({type: REGISTER_FAIL, payload: error.response})
    }
}

export const loadUser = (updateUser) => async (dispatch)=> {
    try{
        if(!updateUser){
            dispatch({type: LOAD_USER_REQUEST});
        }
        
        const {data} = await axios.get(`/api/v1/me`)

        if(updateUser){
            dispatch({type: UPDATE_USER, payload: data.user})
        }else{
            dispatch({type: LOAD_USER_SUCCESS, payload: data.user})
        }

    }catch(error){
        dispatch({type: LOAD_USER_FAIL, payload: error.response})
    }
}

export const forgetPassword = (email) => async (dispatch)=> {
    try{
        dispatch({type: FORGET_PASSWORD_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        
        const {data} = await axios.post(`/api/v1/password/forgot`, email, config)

        dispatch({type: FORGET_PASSWORD_SUCCESS, payload: data.message})

    }catch(error){
        dispatch({type: FORGET_PASSWORD_FAIL, payload: error.response})
    }
}

export const resetPassword = (token, passwords) => async (dispatch)=> {
    try{
        dispatch({type: RESET_PASSWORD_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        
        const {data} = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)

        dispatch({type: RESET_PASSWORD_SUCCESS, payload: data.success})

    }catch(error){
        dispatch({type: RESET_PASSWORD_FAIL, payload: error.response})
    }
}

export const logout = () => async (dispatch) => {

    const {data} = await axios.get(`/api/v1/logout`)
    if(data.success){
        dispatch({type:  LOGOUT})
    }

} 

export const getAllTodaysUsers = () => async (dispatch)=> {
    try{
        dispatch({type: ALL_TODAYS_USERS_REQUEST});
        
        const {data} = await axios.get(`/api/v1/admin/users/today`)

        dispatch({type: ALL_TODAYS_USERS_SUCCESS, payload: data.users})

    }catch(error){
        dispatch({type: ALL_TODAYS_USERS_FAIL, payload: error.response})
    }
}

export const getAllUsers = () => async (dispatch)=> {
    try{
        dispatch({type: ALL_USERS_REQUEST});
        
        const {data} = await axios.get(`/api/v1/admin/users`)

        dispatch({type: ALL_USERS_SUCCESS, payload: data.users})

    }catch(error){
        dispatch({type: ALL_USERS_FAIL, payload: error.response})
    }
}


export const getUserDetails = (id) => async (dispatch)=> {
    try{
        dispatch({type: USER_DETAILS_REQUEST});
        
        const {data} = await axios.get(`/api/v1/admin/user/${id}`)

        dispatch({type: USER_DETAILS_SUCCESS, payload: data.user})

    }catch(error){
        dispatch({type: USER_DETAILS_FAIL, payload: error.response})
    }
}

export const updateUser = (id, userData) => async (dispatch)=> {
    try{
        dispatch({type: UPDATE_USER_REQUEST});
        
        const config = {headers: {"Content-Type": "application/json"}};

        const {data} = await axios.put(`/api/v1/admin/user/${id}`, userData, config)

        dispatch({type: UPDATE_USER_SUCCESS, payload: data.success})

    }catch(error){
        dispatch({type: UPDATE_USER_FAIL, payload: error.response})
    }
}

export const deleteUser = (id) => async (dispatch)=> {
    try{
        dispatch({type: DELETE_USER_REQUEST});
        
        const {data} = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({type: DELETE_USER_SUCCESS, payload: data})

    }catch(error){
        dispatch({type: DELETE_USER_FAIL, payload: error.response})
    }
}

export const raiseErrors = (error) => async (dispatch) => {
    dispatch({
        type:  RAISE_ERRORS,
        payload: error
    })
} 

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:  CLEAR_ERRORS
    })
} 