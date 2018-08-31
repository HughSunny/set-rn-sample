import {createAction} from './index'
import {routerReducer} from '../DvaRouter'
import {NavigationActions} from 'react-navigation'

//2018 0830 新版 dva-starter  废弃
const watcher = {type: 'watcher'}
const actions = [
    NavigationActions.BACK,
    NavigationActions.INIT,
    NavigationActions.NAVIGATE,
    NavigationActions.RESET,
    NavigationActions.SET_PARAMS,
    NavigationActions.URI,
]
//调用 yield put(NavigationActions.navigate({ routeName: 'Profile'}))

//调用 2 this.props.dispatch(
//     NavigationActions.navigate({ routeName: 'Search' })
// )
export default {
    namespace: 'navigation_router',
    state: {
        ...routerReducer(),
    },
    reducers: {
        apply(state, {payload: action}) {
            return routerReducer(state, action)
        },
    },
    effects: {
        watch: [
            function* ({take, call, put}) {
                while (true) {
                    const payload = yield take(actions);

                    yield put(createAction('apply')(payload));
                    //等同于
                    // put({
                    //     type: 'apply',
                    //     payload,
                    // })
                    if (payload.type === 'Navigation/NAVIGATE') {
                        console.log('11111', payload);
                    }
                }
            }, watcher]
    },
}
