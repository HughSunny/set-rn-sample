import {call, put, take} from 'redux-saga/effects'

import * as fetchActionTypes from '../../constant/fetchActionType';
import * as loginActionTypes from './actionTypes'
import http from "../../util/AxiosHttp";

export function* login (url, params) {

    return yield http.get(url, params)
}

export function* loginRequest() {
    while(true){
        let req = yield take(loginActionTypes.LOGIN);
        let loginData = {
            "userName":req.username ,
            "password":req.password
        }
        let res = yield call(login, '/api/login', loginData);
        console.log(res);
        yield put({type:loginActionTypes.LOGIN_SUCCESS, data:res});
    }
}