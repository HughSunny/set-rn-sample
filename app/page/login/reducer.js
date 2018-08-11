import * as actionTypes from './actionTypes'
import {AsyncStorage} from "react-native";

export default function(state=[],action) {
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
            return Object.assign(state, {
                loading: false,
                userinfo:action.data
            });
        default :
            return state;
    }
}