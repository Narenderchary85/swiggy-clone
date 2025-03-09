import {legacy_createStore as createStore ,applyMiddleware} from "redux";
import {thunk} from 'redux-thunk'
import { combineReducers } from "redux";
import { cartReducer , restaurantReducer} from "./cartreducer";

const middleware=[thunk]

const reducers=combineReducers({
    cart:cartReducer,
    restaurant:restaurantReducer
})

const store=createStore(reducers,applyMiddleware(...middleware))

export default store;