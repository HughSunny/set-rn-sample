import React from 'react';
import PropTypes from 'prop-types';
import {View,Text} from 'react-native'
import {connect} from 'react-redux';
import LoginView from './view/login';
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
    }

    //标题栏
    static navigationOptions = {
        header:null
    };

    render() {
        const {username, password, userinfo, toLoginIn, changeUsername, changePassword} = this.props;
        return (<View style={{
            flex: 1,
            padding: 30,
            backgroundColor: '#ffffff'
        }}>
            <Text style={{
                color: 'black', padding: 5, fontSize: 18
            }}>{userinfo}</Text>
            <LoginView toLoginIn={toLoginIn} username={username} password={password}
                       changeUsername={changeUsername} changePassword={changePassword}/>
        </View>);
        // return (<LoginView toLoginIn={toLoginIn} username={username} password={password}
        //                    changeUsername={changeUsername} changePassword={changePassword}/>);
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log("shouldComponentUpdate");
        //  const {userinfo} = nextProps;
        //     if (userinfo != null ) {
        //         this.props.navigation('LoginSuccess');
        //     }
    }

}

Login.defaultProps={
    loading:false,
    username:"admin",
    password:"admin",
    userinfo:"123"
};
Login.propTypes = {
    loading:PropTypes.bool,
    username:PropTypes.string,
    password:PropTypes.string,
    userinfo:PropTypes.string
};

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
    console.log("mapStateToProps" + state);
    return {
        loading:state.loading,
        username:state.username,
        password:state.password,
        userinfo:state.userinfo
    };
}
export default connect(mapStateToProps,mapStateToDispatch)(Login);