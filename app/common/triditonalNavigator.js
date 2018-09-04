import { createStackNavigator } from 'react-navigation';
import Splash from '../routes/Splash';
import Welcome from "../routes/Welcome";
import Login from "../routes/login/sagaIndex";

import HomeBottomTab from '../routes/home/routes'
import LearnFlex from "../routes/test/LearnFlex";
import LoginSuccess from "../routes/LoginSuccess";
import {
    BackHandler
} from "react-native";

//传统的navigation使用方法

const App = createStackNavigator(
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
