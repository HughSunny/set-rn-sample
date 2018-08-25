import React from 'react';
import PropTypes from 'prop-types';
import {View,Text} from 'react-native'
import {connect} from 'react-redux';
import LoginView from './view/LoginView';
import * as actionTypes from './actionTypes';
import {toLogin} from "./actions";
// import {bindActionCreators} from 'redux';
import {
    StyleSheet,
    AsyncStorage
} from "react-native";
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.changeUsername  = this.changeUsername.bind(this);
        this.changePassword  = this.changePassword.bind(this);
        this.toLoginIn = this.toLoginIn.bind(this);
    }

    componentDidMount() {
        // this.setState({
        //     username:'admin',
        //     password:'admin'
        // })

        // this.props.changeUsername("admin");
    }

    //标题栏
    static navigationOptions = {
        header:null
    };

    changeUsername(newText) {
        this.setState({
            password:newText
        });
        this.props.changeUsername(newText);
    }

    changePassword(newText) {
        this.setState({
            username:newText
        });
        this.props.changePassword(newText);
    }

    toLoginIn(username,password){
        const navigation  = this.props.navigation;
        navigation.navigate('Home',{});
    }


    render() {
        const {username, password, userinfo, changeUsername, changePassword, toLoginIn} = this.props;
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
                numberOfLines={1}>{userinfo}</Text>
            <LoginView toLoginIn={this.toLoginIn} username={username} password={password}
                       changeUsername={changeUsername} changePassword={changePassword}/>
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


const mapStateToDispatch=(dispatch, ownProps)=>{
    return {
        toLoginIn:(username,password)=>{
            //bindActionCreators(toLogin,dispatch);
            console.log("toLoginIn  username = " + username);
            console.log("toLoginIn  password = " + password);
            dispatch(toLogin(username, password) );
        },
        // toLoginIn:()=>{
        //     dispatch(toLogin(this.state.username, this.state.password) );
        // },
        changeUsername:(newText)=>{
            dispatch({type:actionTypes.CHANGE_USERNAME,value:newText});
        },
        changePassword:(newText)=>{
            dispatch({type:actionTypes.CHANGE_PASSWORD,value:newText});
        }
    }
}
const mapStateToProps=(state)=>{
    const loginData = state.login;
    // if (!loginData.res) {
    //     this.props.navigation('LoginSuccess');
    // }
    console.log("mapStateToProps" + loginData);
    return {
        loading:loginData.loading,
        username:loginData.username,
        password:loginData.password,
        userinfo:loginData.userinfo
    };
}
export default connect(mapStateToProps,mapStateToDispatch)(Login);