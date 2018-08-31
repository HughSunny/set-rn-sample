import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers/index';

const middlewares = [];

// configuring sagas middleware
const sagaMiddleware = createSagaMiddleware();

middlewares.push(sagaMiddleware);
if (process.env.NODE_ENV === 'development') {
    //创建中间件logger
    const logger = createLogger();
    middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    // install sagas run
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    return store;
}
