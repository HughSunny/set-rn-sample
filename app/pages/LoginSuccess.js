import React from 'react';
import {
  View,
  Navigator,
  TouchableOpacity,
  ToolbarAndroid,
  Text
} from 'react-native';
import {connect} from "react-redux";
import {NavigationActions} from "../utils/NavigationUtil";

@connect()
export default class LoginSuccess extends React.Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle: "LoginSuccess",
  });

  constructor(props) {
    super(props);
    this.state = {};

  }

  //回到第一个页面去
  onJump() {
    this.props.dispatch(NavigationActions.back());
  }

  render() {
    return (
        <View>
          <TouchableOpacity onPress={this.onJump.bind(this)}>
            <Text> 测试页面，点击返回 </Text>
          </TouchableOpacity>
        </View>
    );

  }

}
