import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configure-store';
import rootSaga from './sagas/index';
import App from './container/app';

const store = configureStore();

// run root sagas
store.runSaga(rootSaga);

const Root = () => (
    <Provider store={store}>
        <App  onNavigationStateChange={(prevState, currentState) => {
            // 只要切换tab,push,pop,这里一定走
            console.log (prevState);
            console.log (currentState);
        }}/>
    </Provider>
);

export default Root;