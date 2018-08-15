import * as actionTypes from './actionTypes'

export function toLogin(username,password) {
    return{
        type: actionTypes.LOGIN,
        username,
        password
    }
}
