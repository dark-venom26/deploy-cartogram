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
    UPDATE_USER_RESET,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    LOGOUT,
    RAISE_ERRORS,
    CLEAR_ERRORS  
} from "../constants/userConstants";

export const userReducer = (state = {user: {}}, {type, payload})=> {
    switch(type){
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: payload
            };
        case UPDATE_USER:
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: payload
            };
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: payload
            };
        case LOAD_USER_FAIL:
            return{
                loading: false,
                isAuthenticated: false,
                user: null,
                error: payload
            };
        case LOGOUT:
            return{
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            };
        case RAISE_ERRORS:
            return {
                ...state,
                error: payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}


export const passwordReducer = (state = {}, {type, payload})=> {
    switch(type){
        case FORGET_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return{
                ...state,
                loading: true,
                error: null
            };
        case FORGET_PASSWORD_SUCCESS:
            return{
                ...state,
                loading: false,
                message: payload
            };
        case RESET_PASSWORD_SUCCESS:
            return{
                ...state,
                loading: false,
                success: payload
            };
        case FORGET_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return{
                ...state,
                loading: false,
                error: payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const allUsersReducer = (state = {users: []}, {type, payload})=> {
    switch(type){
        case ALL_USERS_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case ALL_USERS_SUCCESS:
            return{
                ...state,
                loading: false,
                users: payload
            };
        case ALL_USERS_FAIL:
            return{
                ...state,
                loading: false,
                error: payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const allTodaysUsersReducer = (state = {users: []}, {type, payload})=> {
    switch(type){
        case ALL_TODAYS_USERS_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case ALL_TODAYS_USERS_SUCCESS:
            return{
                ...state,
                loading: false,
                users: payload
            };
        case ALL_TODAYS_USERS_FAIL:
            return{
                ...state,
                loading: false,
                error: payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const userDetailsReducer = (state = {user: []}, {type, payload})=> {
    switch(type){
        case USER_DETAILS_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case USER_DETAILS_SUCCESS:
            return{
                ...state,
                loading: false,
                user: payload
            };
        case USER_DETAILS_FAIL:
            return{
                ...state,
                loading: false,
                error: payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}

export const updateUserReducer = (state = {}, {type, payload})=> {
    switch(type){
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case UPDATE_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated: payload
            };
        case DELETE_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                isDeleted: payload.success,
                message: payload.msg
            };
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
            return{
                ...state,
                loading: false,
                error: payload
            };
        case UPDATE_USER_RESET:
            return{
                ...state,
                isUpdated: false
            };
        case DELETE_USER_RESET:
                return{
                ...state,
                isDeleted: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}