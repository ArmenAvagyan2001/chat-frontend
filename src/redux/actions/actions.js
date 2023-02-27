import {LOGIN, LOGOUT, SET_ONLINE_USERS, SET_USER} from "./types";


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

export const setUser = (user) => dispatch => {
    dispatch({
        type: SET_USER,
        payload: {user}
    })
}

export const setOnlineUsers = (onlineUsers) => dispatch => {
    dispatch({
        type: SET_ONLINE_USERS,
        payload: {onlineUsers}
    })
}
