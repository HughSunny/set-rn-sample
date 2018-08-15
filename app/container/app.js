import { StackNavigator, TabNavigator } from 'react-navigation';
import Splash from '../page/Splash';
import Welcome from "../page/Welcome";
import Login from "../page/login/index";
import LearnFlex from "../page/test/LearnFlex";
import LoginSuccess from "../page/LoginSuccess";
const App = StackNavigator(
    {
        Splash: { screen: Splash },
        //LearnFlex: { screen: LearnFlex },
        Welcome: { screen: Welcome },
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