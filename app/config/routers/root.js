import React, {PureComponent} from 'react';
import {
  BackHandler,
  View,
  ToastAndroid,
  Platform
} from "react-native";
import {connect} from 'react-redux';
import Login from "../../pages/login/dvaIndex";
import Splash from '../../pages/Splash';
import Welcome from "../../pages/Welcome";
import LoginSuccess from "../../pages/LoginSuccess";
import HomePage from "./home";
import {createStackNavigator, TabNavigator, addNavigationHelpers} from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers'

import {NavigationActions} from "../../utils/NavigationUtil";

import LoadingSpinner from '../../components/LoadingSpinner'
const AppNavigation = createStackNavigator(
    {
      Splash: {
        screen: Splash,
        navigationOptions: {
          header: null  //顶部导航很多都会自己自定义，这里就为空
        }
      },
      Welcome: {screen: Welcome},
      Login: {
        screen: Login,
        navigationOptions: {
          header: null  //顶部导航很多都会自己自定义，这里就为空
        }
      },
      Home: {
        screen: HomePage,
        navigationOptions: {
          headerLeft:null
        }
      },
      LoginSuccess: {screen: LoginSuccess},//登录成功
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
          fontSize: 20,
          alignSelf:'center'
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

@connect(({app, router}) => ({app, router}))
export default class Router extends PureComponent {
  componentWillMount() {
    //if (Platform.OS === 'android')
      BackHandler.addEventListener('hardwareBackPress', this.backHandle)
  }

  componentWillUnmount() {
    //if (Platform.OS === 'android')
      BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getActiveRouteName(this.props.router);
    console.log( "backHandle Screen == "  + currentScreen);

    if (currentScreen === 'Splash' ||currentScreen === 'Welcome' ||currentScreen === 'Login') {
      return false;
    } else if (currentScreen === "Page1" || currentScreen === "Page2" || currentScreen === "Page3"  ){//(currentScreen !== 'Home')
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        BackHandler.exitApp();
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);

      return true;
    } else {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  render() {
    const {dispatch, app, router} = this.props;
    //const navigation = addNavigationHelpers({ dispatch, state: router });
    //addNavigationHelpers({ dispatch, state: router })是将会在执行navigation.goBack(),navigation.navigate()的同时执行对应的dispatch，更新router数据。
    return <View style={{backgroundColor: 'transparent', flex: 1}}>
      <App dispatch={dispatch} state={router}/>
      <LoadingSpinner isVisible={app.loading}/>
    </View>
    {/*<App dispatch={dispatch} state={router}/>*/}
  }
}



