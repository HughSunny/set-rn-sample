import {call, put, take} from 'redux-saga/effects'

import * as fetchActionTypes from '../../constant/fetchActionType';
import * as loginActionTypes from './actionTypes'
import http from "../../util/AxiosHttp";

export function* login (url, params) {
    try {
        return yield http.get(url, params);
    } catch (error) {
        console.log(error)
    }
    return null;
}

export function* loginRequest() {
    while(true){
        let req = yield take(loginActionTypes.LOGIN);
        let loginData = {
            "userName":req.username ,
            "password":req.password
        }
        let res = yield call(login, '/api/login', loginData);

        if (res == null) {
            yield put({type:loginActionTypes.LOGIN_FAILD, data:"网路错误"});
        } else {
            var type = typeof(res);
            console.log("loginRequest res type : " + type);
            console.log("loginRequest res : " + res.toString());
            // if (type == 'object') {
            //     yield put({type:loginActionTypes.LOGIN_FAILD, data:res.toString()})
            // }else [
            //     yield put({type:loginActionTypes.LOGIN_SUCCESS, data:res})
            // ]
            yield put({type:loginActionTypes.LOGIN_SUCCESS, data:JSON.stringify(res)})
        }

    }
}