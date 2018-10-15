import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './saga_module/store/configure-store';
import rootSaga from './saga_module/sagas/index';
import App from './config/triditonalNavigator';

const store = configureStore();

// run root sagas
store.runSaga(rootSaga);

const SagaRoot = () => (
    <Provider store={store}>
        <App  onNavigationStateChange={(prevState, currentState) => {
            // 只要切换tab,push,pop,这里一定走
            console.log (prevState);
            console.log (currentState);
        }}/>
    </Provider>
);

export default SagaRoot;
