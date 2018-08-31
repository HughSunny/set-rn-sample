import React from 'react';
import PropTypes from 'prop-types';
import {View,Text} from 'react-native'
import {connect} from 'react-redux';
import LoginView from './view/LoginView';
import * as actionTypes from '../../saga_module/actions/LoginActionTypes';
import {toLogin} from "../../saga_module/actions/LoginAction";
import {
    StyleSheet,
    AsyncStorage
} from "react-native";
export default class DvaLogin extends React.Component{
    constructor(props) {
        super(props);


        this.changeUsername  = this.changeUsername.bind(this);
        this.changePassword  = this.changePassword.bind(this);
        this.toLoginIn = this.toLoginIn.bind(this);
    }

    componentDidMount() {
        this.setState({
            username:'admin',
            password:'admin'
        })
    }

    //标题栏
    static navigationOptions = {
        header:null
    };

    changeUsername(newText) {
        this.setState({
            password:newText
        });

    }

    changePassword(newText) {
        this.setState({
            username:newText
        })
    }

    toLoginIn(username,password){

    }


    render() {
        const { changeUsername, changePassword, toLoginIn} = this.props;
        // var type = 'string';
        // type = typeof(userinfo);
        return (<View style={{
            flex: 1,
            padding: 30,
            backgroundColor: '#ffffff'
        }}>
            <Text
                style={{
                    color: 'black', padding: 5, fontSize: 18
                }}
                numberOfLines={1}>111</Text>
            <LoginView toLoginIn={this.toLoginIn} username={this.state.username} password={this.state.password}
                       changeUsername={this.changeUsername} changePassword={this.changePassword}/>
        </View>);
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldComponentUpdate");
        return true;
        //  const {userinfo} = nextProps;
        //     if (userinfo != null ) {
        //         this.props.navigation('LoginSuccess');
        //     }
    }
}