import {LOGIN, LOGOUT, SET_ONLINE_USERS} from "./types";


export const login = (user) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: {user}
    })
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}

export const setOnlineUsers = (onlineUsers) => dispatch => {
    dispatch({
        type: SET_ONLINE_USERS,
        payload: {onlineUsers}
    })
}
