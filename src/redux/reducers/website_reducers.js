import {LOGIN, LOGOUT, SET_USER} from "../actions/types";

const initialState = {
    isAuth: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true, user: action.payload.user}
        case LOGOUT:
            localStorage.clear()
            return initialState
        default:
            return state
    }
}
