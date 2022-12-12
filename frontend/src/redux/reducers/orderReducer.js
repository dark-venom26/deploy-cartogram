import { 
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    ALL_TODAYS_ORDERS_REQUEST,
    ALL_TODAYS_ORDERS_SUCCESS,
    ALL_TODAYS_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET,
    CLEAR_ERRORS 
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, {type, payload})=> {
    switch(type){
        case CREATE_ORDER_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case CREATE_ORDER_SUCCESS:
            return{
                ...state,
                loading: false,
                order: payload
            };
        case CREATE_ORDER_FAIL:
            return{
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

export const myOrdersReducer = (state = {orders: []}, {type, payload})=> {
    switch(type){
        case MY_ORDERS_REQUEST:
            return{
                loading: true,
            };
        case MY_ORDERS_SUCCESS:
            return{
                loading: false,
                orders: payload
            };
        case MY_ORDERS_FAIL:
            return{
                loading: false,
                error: payload
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = {order: {}}, {type, payload})=> {
    switch(type){
        case ORDER_DETAILS_REQUEST:
            return{
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return{
                loading: false,
                order: payload
            };
        case ORDER_DETAILS_FAIL:
            return{
                loading: false,
                error: payload
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const allOrdersReducer = (state = {orders: []}, {type, payload})=> {
    switch(type){
        case ALL_ORDERS_REQUEST:
            return{
                loading: true,
            };
        case ALL_ORDERS_SUCCESS:
            return{
                loading: false,
                orders: payload
            };
        case ALL_ORDERS_FAIL:
            return{
                loading: true,
                error: payload
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const allTodaysOrdersReducer = (state = {orders: []}, {type, payload})=> {
    switch(type){
        case ALL_TODAYS_ORDERS_REQUEST:
            return{
                loading: true,
            };
        case ALL_TODAYS_ORDERS_SUCCESS:
            return{
                loading: false,
                orders: payload
            };
        case ALL_TODAYS_ORDERS_FAIL:
            return{
                loading: true,
                error: payload
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const orderReducer = (state = {}, {type, payload})=> {
    switch(type){
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return{
                ...state,
                loading: true,
            };
        case UPDATE_ORDER_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated: payload
            };
        case DELETE_ORDER_SUCCESS:
            return{
                ...state,
                loading: false,
                isDeleted: payload
            };
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return{
                ...state,
                loading: false,
                error: payload
            };
        case UPDATE_ORDER_RESET:
            return{
                ...state,
                isUpdated: false,
            };
        case DELETE_ORDER_RESET:
            return{
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state;
    }
}