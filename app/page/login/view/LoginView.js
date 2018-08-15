
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image, AsyncStorage,
} from 'react-native';

import EditView from '../../../ui/EditView';
import LoginButton from './LoginButton';

/**
 * Created by Hugh on 2018/8/6
 */
export default class LoginView extends Component {
    //标题栏
    static navigationOptions = {
        header:null
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {username, password, changeUsername, changePassword, toLoginIn } = this.props;
        console.log('username = ' + username);
        console.log('password = ' + password);
        console.log(this);
        return (

            <View style={styles.loginview}>
                <View  style={{flexDirection: 'row', height:100, marginTop:1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',}}>
                    <Image source={require('../../../img/icon_play.png')}/>
                </View>
                <View style={{marginTop:80}}>

                    <EditView  name='输入用户名/注册手机号'
                               value={username}
                               onChangeText={(text) => {
                                   changeUsername(text)
                               }}/>
                    <EditView name='输入密码'
                              value={password}
                              secureTextEntry={true}
                              onChangeText={(text) => {
                                  changePassword(text)
                              }}/>
                    <LoginButton name='登录' onPressCallback={
                        toLoginIn.bind(this, username, password )}
                    />
                    <Text style={{color:"#4A90E2",textAlign:'center',marginTop:100}} >忘记密码？</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginview: {
        flex: 1,
        padding: 30,
        backgroundColor: '#ffffff',
    },
});