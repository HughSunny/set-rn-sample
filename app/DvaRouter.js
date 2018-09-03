import React, {PureComponent} from 'react';
import {
    BackHandler
} from "react-native";
import {connect} from 'react-redux';
import Login from "./routes/login/dvaIndex";
import HomeBottomTab from './routes/home/routes'
import LoginSuccess from "./routes/LoginSuccess";
import { StackNavigator, TabNavigator, addNavigationHelpers} from 'react-navigation';

import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers'
import Splash from './routes/Splash';
import Welcome from "./routes/Welcome";
import {NavigationActions} from "./utils/NavigationUtil";

const AppNavigation = StackNavigator(
    {
        Splash: {
            screen: Splash,
            navigationOptions: {
                header: null  //顶部导航很多都会自己自定义，这里就为空
            } },
        Welcome: { screen: Welcome },
        Login:{ screen: Login ,navigationOptions: {
                header: null  //顶部导航很多都会自己自定义，这里就为空
            }},
        Home: {screen: HomeBottomTab,  },
        LoginSuccess: { screen: LoginSuccess },//登录成功
        // Home: {
        //     screen: TabContainer,
        //     navigationOptions: {
        //         headerLeft: null
        //     }
        // },
        // Web: { screen: WebViewPage }
    },
    {
        headerMode: 'screen',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#3e9ce9'
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20
            },
            headerTintColor: '#fff'
        }
    }
);

export const routerReducer = createNavigationReducer(AppNavigation);

export const routerMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.router
);

const App = reduxifyNavigator(AppNavigation, 'root');

function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index]
    if (route.routes) {
        return getActiveRouteName(route)
    }
    return route.routeName
}

@connect (({ app, router }) => ({app, router }))
export default class Router extends PureComponent {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }

    backHandle = () => {
        const currentScreen = getActiveRouteName(this.props.router)
        if (currentScreen === 'Login') {
            return true
        }
        if (currentScreen !== 'Home') {
            this.props.dispatch(NavigationActions.back())
            return true
        }
        return false
    }

    render() {
        const { dispatch, app, router } = this.props;
        //const navigation = addNavigationHelpers({ dispatch, state: router });
        //addNavigationHelpers({ dispatch, state: router })是将会在执行navigation.goBack(),navigation.navigate()的同时执行对应的dispatch，更新router数据。
        return <AppNavigation dispatch={dispatch}  state={router} />
    }
}



