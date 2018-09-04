
import { createAction, Storage } from '../utils'
import {NavigationActions} from '../utils/NavigationUtil'
import * as authService from '../services/auth'

export default {
  namespace: "login",
  state: {
    fetching: false,
  },
  reducers: {
    updateState(state, { payload }) {
      console.log("login  updateState");
      return { ...state, ...payload }
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put(createAction('app/updateState')({ loading: true }))
      yield put(createAction('updateState')({ fetching: true }))
      const login = yield call(authService.login, payload)
      // if (login) {
      //   yield put(NavigationActions.back())
      // }
      yield put(createAction('app/updateState')({ isLogined:login}))
      yield put(createAction('updateState')({ fetching: false }))
      yield put(createAction('app/updateState')({ loading: false }))
      Storage.set('login', login)
      yield put(NavigationActions.navigate({routeName:"Home"}))

    },

    *logout(action, { call, put }) {
      yield call(Storage.set, 'login', false)
      yield put(createAction('app/updateState')({ login: false }))
    },
  },
  subscriptions: {
  },
}
