import {createAction, Storage} from "../utils";

export default {
  namespace:"app",

  state:{
    isInit:-1,
    isLogined: false,
    loading:false,
    fetching: false,
  },

  reducers: {
    updateState(state, { payload }) {
      console.log("APP  updateState");
      return { ...state, ...payload }
    },
  },

  effects: {
    *loadisLogin(action, { call, put }) {
      const isLogined = yield call(Storage.get, 'login', false);
      console.log("APP  updateState  isLogined = " + isLogined);
      yield put(createAction('updateState')({ isLogined, }));//loading: true
    },
    *loadisInit(action, { call, put }) {
      const isInit = yield call(Storage.get, 'isInit', 0);
      console.log("APP  updateState  isInit = " + isInit);
      yield put(createAction('updateState')({isInit}));
    },
  },

  subscriptions: {//订阅
    setup({ dispatch }) {
      console.log("setup : loadisLogin");
      dispatch({ type: 'loadisLogin' })
      console.log("setup : loadisInit");
      dispatch({ type: 'loadisInit' })
    },
  },
}
