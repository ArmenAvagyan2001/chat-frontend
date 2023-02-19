import {LOGIN, SET_USER, LOGOUT} from "./types";


export const login = () => dispatch => {
    dispatch({
        type: LOGIN
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
        user
    })
}
