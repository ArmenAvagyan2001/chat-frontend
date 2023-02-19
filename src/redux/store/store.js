import { createStore, applyMiddleware } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import rootReducer from "../reducers/index"

const initialState = {}
const middleware = [thunk];

const persistConfig = {
    key: "website",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(...middleware)
);

const persistor = persistStore(store);

export { persistor }
export default store;
