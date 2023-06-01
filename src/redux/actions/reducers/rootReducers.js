import { combineReducers } from "redux";
import { authReducer } from "./authRecuder";


export const rootReducers = combineReducers({
    auth: authReducer
})