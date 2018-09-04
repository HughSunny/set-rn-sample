import React, {Component} from 'react';
import {AppRegistry, Platform, Text, TextInput} from 'react-native';
import AddCustomProps from './app/utils/AddCustomProps'

import DvaRoot from "./app/DvaRoot";
import Root from "./app/SagaRoot";

export default class WebStormProject extends Component {
  constructor(props) {
    super(props);
    global.isDva = true;
  }

  render() {
    if (global.isDva) {
      return (
          <DvaRoot/>
      );
    } else {
      return (
          <Root/>
      );
    }
    // return (
    //     <Root/>
    // );
  }

  componentDidMount = () => {
    console.disableYellowBox = true; //去除黄色弹框警告
  };
}


// 处理iOS系统文字
AddCustomProps(Text, {allowFontScaling: false});
AddCustomProps(TextInput, {allowFontScaling: false});

AppRegistry.registerComponent('WebStormProject', () => WebStormProject);
