import * as actionTypes from './LoginActionTypes'

export function toLogin(username,password) {
    return{
        type: actionTypes.LOGIN,
        username,
        password
    }
}
