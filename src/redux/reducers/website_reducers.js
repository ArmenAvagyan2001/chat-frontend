import {LOGIN, LOGOUT, SET_USER} from "../actions/types";

const initialState = {
    isAuth: false,
    user: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true}
        case SET_USER:
            return {...state, user: action.user}
        case LOGOUT:
            localStorage.clear()
            return initialState
        default:
            return state
    }
}
