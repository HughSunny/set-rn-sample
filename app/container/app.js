import { StackNavigator, TabNavigator } from 'react-navigation';
import Splash from '../page/Splash';
// import LoginActivity from "../page/MainPage";

import Login from "../page/login/index";
import LoginSuccess from "../page/LoginSuccess";
const App = StackNavigator(
    {
        Splash: { screen: Splash },
        Login:{screen: Login },
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
export default App;