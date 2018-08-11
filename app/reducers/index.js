import { combineReducers } from 'redux';
import login from '../page/login/reducer'
const rootReducer = combineReducers({
    login: login
});

export default rootReducer;