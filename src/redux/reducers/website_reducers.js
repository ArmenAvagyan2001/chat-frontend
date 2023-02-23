import {LOGIN, LOGOUT, SET_ONLINE_USERS} from "../actions/types";

const initialState = {
    isAuth: false,
    user: {},
    onlineUsers: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true, user: action.payload.user}
        case LOGOUT:
            localStorage.clear()
            return initialState
        case SET_ONLINE_USERS:
            return {...state, onlineUsers: action.payload.onlineUsers}
        default:
            return state
    }
}
