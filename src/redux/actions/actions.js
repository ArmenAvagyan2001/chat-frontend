import {LOGIN, SET_USER, LOGOUT} from "./types";


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
