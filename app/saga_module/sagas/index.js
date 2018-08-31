import { all, fork } from 'redux-saga/effects';
import {loginRequest} from './login';
export default function* rootSaga() {
    yield all(
        [fork(loginRequest)]
    );
    //yield fork(loginRequest);
}
