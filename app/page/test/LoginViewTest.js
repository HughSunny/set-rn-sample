import React, { Component } from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
//导入stack导航组件
import { StackNavigator } from 'react-navigation';
import EditView from '../../component/EditView';
import LoginButton from '../login/view/LoginButton';
import LoginSuccess from '../LoginSuccess';
import NetUtil from '../../util/NetUtil';

const {height,width} = Dimensions.get('window');

//UI一般给出的设计稿单位都是px，那我们RN中的单位是dp，那么我们就需要将px转换为dp，这就需要使用像素密度了。
const pixelRatio = PixelRatio.get();

class LoginActivity extends Component {
    //标题栏
    static navigationOptions = {
        header:null
    };
    constructor(props) {
        super(props);
        this.userName = AsyncStorage.getItem('USER');
        this.password = AsyncStorage.getItem('PASSWORD');
        if (this.userName == null) {
            this.userName = 'admin';
            this.password = 'admin';
        }

        this.state = {
            inputUser:'',
            inputPw:''
        }
        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(newText){
        this.setState((state) => {
            for (var aName in state) {
                console.log(aName)
                console.log(state[aName])
            }
            console.log(this);

            return {
                inputUser:newText,
            }
        })
    }

    render() {
        console.log('username = ' + this.userName);
        console.log('password = ' + this.password);
        console.log(this);
        return (

            <View style={LoginStyles.loginview}>
                <View   style={{flexDirection: 'row', height:100, marginTop:1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',}}>
                    <Image source={require('../../img/icon_play.png')}/>
                </View>
                <View style={{marginTop:80}}>
                    {/*<EditView  name='输入用户名/注册手机号'*/}
                               {/*onChangeText={(text) => {*/}
                                   {/*this.userName = text;*/}
                               {/*}}/>*/}

                    <EditView  name='输入用户名/注册手机号'
                               value={this.userName}
                               onChangeText={(text) => {
                                   this.updateUser(text)
                               }}/>
                    <EditView name='输入密码'
                              value={this.password}
                              secureTextEntry={true}
                              onChangeText={(text) => {
                        this.password = text;
                    }}/>
                    <LoginButton name='登录' onPressCallback={this.onPressCallback}/>
                    <Text style={{color:"#4A90E2",textAlign:'center',marginTop:100}} >忘记密码？</Text>
                </View>
            </View>
        )
    }


    //https://www.jianshu.com/p/cd25ab44a3f6

    onPressCallback = () => {
        let formData = new FormData();
        formData.append("userName",this.userName);
        formData.append("password",this.password);


        let url = "http://192.168.21.114:8080/api/login";
        let loginData = {
            "userName":this.userName ,
            "password":this.password
        }
        NetUtil.getJson(url,loginData,(responseText) => {
            alert(responseText);
            this.onLoginSuccess();
        })
        // url =  "http://192.168.21.114:8080/api/login?userName=admin&password=admin"
        // console.info(url);
        // NetUtil.getUrlJson(url,(responseText) => {
        //     alert(responseText);
        //     this.onLoginSuccess();
        // })
    };

    //跳转到第二个页面去
    onLoginSuccess(){
        const { navigate } = this.props.navigation;
        AsyncStorage.setItem('USER', this.userName);
        AsyncStorage.setItem('PASSWORD', this.password);
        navigate('LoginSuccess');
    }
}

const SimpleApp = StackNavigator({
    Login: { screen: LoginActivity },
    LoginSuccess: { screen: LoginSuccess },//新添加的screen
});

export default SimpleApp;


const LoginStyles = StyleSheet.create({
    loginview: {
        flex: 1,
        padding: 30,
        backgroundColor: '#ffffff',
    },
});