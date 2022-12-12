import { 
    UPDATE_PROFILE_REQUEST, 
    UPDATE_PROFILE_FAIL, 
    UPDATE_PROFILE_RESET, 
    UPDATE_PROFILE_SUCCCESS,
    UPDATE_PASSWORD_REQUEST, 
    UPDATE_PASSWORD_FAIL, 
    UPDATE_PASSWORD_RESET, 
    UPDATE_PASSWORD_SUCCCESS,
    CLEAR_ERRORS
} from "../constants/profileConstants";

export const profileReducer = (state = {}, {type, payload})=> {
    switch(type){
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return{
                ...state,
                updating: true,
            };
        case UPDATE_PROFILE_SUCCCESS:
        case UPDATE_PASSWORD_SUCCCESS:
            return{
                ...state,
                updating: false,
                isUpdated: payload
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return{
                ...state,
                updating: false,
                error: payload
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return{
                ...state,
                isUpdated: false
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