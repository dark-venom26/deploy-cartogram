import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR
} from "../constants/sidebarConstant";

export const toggleSidebarReducer = (state = {sidebar: false}, {type, payload})=> {

    switch (type) {
        case OPEN_SIDEBAR:
            return {
                sidebar: payload,
            };
        case CLOSE_SIDEBAR:
            return {
                sidebar: payload,
            };
        default:
            return state;
    }
};