import { combineReducers } from 'redux'
import websiteReducers from "./website_reducers"

export default combineReducers ({
    items: websiteReducers
});
