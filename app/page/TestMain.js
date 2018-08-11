import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    DeviceEventEmitter,
    AsyncStorage
} from 'react-native';

import Button from '../ui/Button';
import TextButton from '../ui/TextButton';
import px2dp from '../util/px2dp';
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: '1234567890',
});``
export default class TestMain extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            inputNum:'111'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native  SXX  '\r\n' THIS is webstone run remote!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <TextInput style={styles.instructions}
                value={this.state.inputNum}>
                </TextInput>

                <Button text="测试跳转"
                        style={styles.btn }
                        onPress={this._handleBack.bind(this)}/>

                <View style={styles.textButtonLine}>
                    <TextButton text="测试promise" onPress={this._testPromise.bind(this)}/>
                    {/*<TextButton text="测试回调" onPress={this._testCallBack.bind(this)}/>*/}
                    <TextButton text="测试回调" onPress={() => this._testCallBack()}/>
                </View>
            </View>
        );
    }

    _handleBack() {
        var { NativeModules } = require('react-native');
        let ExampleInterface = NativeModules.ExampleInterface;
        NativeModules.ExampleInterface.toOtherPage( 'toOtherPage');
    }

    _testCallBack(){
        DeviceEventEmitter.addListener('AndroidToRnMsg', this.handleAndroidMessage);//原生监听
        var { NativeModules } = require('react-native');
        let ExampleInterface = NativeModules.ExampleInterface;
        NativeModules.ExampleInterface.HandleMessage( 'testMessage' );
    }

    handleAndroidMessage(amessage) {
        console.log('handleAndroidMessage ==>' + amessage);

    }

    _testPromise(){
        var { NativeModules } = require('react-native');
        let ExampleInterface = NativeModules.ExampleInterface;
        NativeModules.ExampleInterface.HandlePromiseMessage( 'testMessage' ).then(
            (result) => {
                console.log(result);
                Alert.alert(
                    'Alert 标题',
                    result,
                    [
                        /**
                         *  注意参数名字一定不能错
                         */
                        {text: '确定', onPress: ()=> console.log('点击确定')}
                    ]);
                let aObj = JSON.parse(result);
                if (aObj != null) {
                    this.setState({inputNum:aObj.phone});
                }
            }
        ).catch(
            (error) => {
                console.log(error);
                console.log(error.message);
            }
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // flexDirection: 'column',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        marginTop:50,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },

    textButtonLine:{
        marginTop: px2dp(12),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft:20,
        marginRight:20
    },

    btn:{
        marginTop: 10,
        height:50,
    }
});