import { StackNavigator, TabNavigator } from 'react-navigation';
import Splash from '../page/Splash';
import Welcome from "../page/Welcome";
import Login from "../page/login/index";

import HomeBottomTab from '../page/home/routes'
import LearnFlex from "../page/test/LearnFlex";
import LoginSuccess from "../page/LoginSuccess";
import {
    BackHandler
} from "react-native";
const App = StackNavigator(
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

const defaultGetStateForAction = App.router.getStateForAction;

App.router.getStateForAction = (action, state) => {
    if (state && state.routes.length==1 && action.type=='Navigation/BACK'){
        //在项目首页并且按了物理键返回
        console.log("getStateForAction == > exitApp" );
        BackHandler.exitApp()
    }
    return defaultGetStateForAction(action, state);
};


export default App;