import * as actionTypes from '../actions/LoginActionTypes'
import {AsyncStorage} from "react-native";

const initialState = {
    loading:false,
    username:"admin",
    password:"admin",
    userinfo:""
}

export default function(state= initialState, action) {
    switch (action.type){
        case actionTypes.CHANGE_USERNAME:
            return Object.assign({},state,{username:action.value});
        case actionTypes.CHANGE_PASSWORD:
            return Object.assign({},state,{password:action.value});
        case actionTypes.LOGIN:
            return Object.assign({}, state, {
                loading: true
            });
        case actionTypes.LOGIN_SUCCESS:
            console.log("reducer  LOGIN_SUCCESS ")
            return Object.assign({},state, {
                loading: false,
                userinfo:action.data
            });
        case actionTypes.LOGIN_FAILD:
            console.log("reducer  LOGIN_FAILD ");
            return Object.assign({},state, {
                loading: false,
                userinfo:action.data
            });
        default :
            return state;
    }
}