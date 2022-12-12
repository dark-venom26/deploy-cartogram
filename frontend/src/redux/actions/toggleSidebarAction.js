import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR
} from "../constants/sidebarConstant";

export const openSidebar = () => async (dispatch)=> {

    dispatch({type: OPEN_SIDEBAR, payload: true})

}

export const closeSidebar = () => async (dispatch)=> {

    dispatch({type: CLOSE_SIDEBAR, payload: false})

}