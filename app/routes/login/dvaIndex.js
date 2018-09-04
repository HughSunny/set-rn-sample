import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'
import {connect} from 'react-redux';
import LoginView from './view/LoginView';
import {
  StyleSheet,
  AsyncStorage
} from "react-native";
import {NavigationActions} from '../../utils/NavigationUtil'
@connect(({app}) => ({...app}))
export default class DvaLogin extends React.Component {
  constructor(props) {
    super(props);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.toLoginIn = this.toLoginIn.bind(this);

    this.state = {
      username: 'admin',
      password: 'admin'
    };
  }

  componentDidMount() {

  }

  //标题栏
  static navigationOptions = {
    header: null
  };

  changeUsername(newText) {
    this.setState({
      username: newText
    })
  }

  changePassword(newText) {
    this.setState({
      password: newText
    });

  }

  toLoginIn(username, password) {
    // const resetAction = NavigationActions.init({
    //   index: 0,
    //   actions: [NavigationActions.navigate({routeName: 'Home'})]
    // });
    // this.props.dispatch(resetAction);
    this.props.dispatch(NavigationActions.navigate({routeName: 'Home'}));
  }


  render() {
    const {changeUsername, changePassword, toLoginIn} = this.props;
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

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
    //  const {userinfo} = nextProps;
    //     if (userinfo != null ) {
    //         this.props.navigation('LoginSuccess');
    //     }
  }
}
