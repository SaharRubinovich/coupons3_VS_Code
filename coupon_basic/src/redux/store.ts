import { combineReducers, createStore } from "redux";
import { authReducer } from './authState';
import { configureStore } from '@reduxjs/toolkit';
import { companyReducer } from "./companyState";
import { customerReducer } from "./customersState";
import { couponsReducer } from "./couponsState";
import { cartReducer } from "./cartState";

//single reducer - old way
//export const store = createStore(authReducer);


//multiple reducers - use before react 18
//const reducers = combineReducers({authState:authReducer});
//const store = createStore(reducers);

const reducers = combineReducers({authState:authReducer, companyState:companyReducer, customersState:customerReducer
,couponsState: couponsReducer, cartState:cartReducer})
export const store = configureStore({reducer: reducers});



