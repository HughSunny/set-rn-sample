import React from "react";

import {StyleSheet,View} from "react-native";
import {Header,Body,Title,Container, Content} from 'native-base'
import HomeBottomTab from "./routes";
import {connect} from 'react-redux'

//虚拟主页
@connect()
export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.setTitle = this.setTitle.bind(this);
    this.state = {
      title:''
    }
  }
  static navigationOptions = ({navigation, screenProps}) => ({
    headerLeft: null,
    //header:null,
  });

  render() {
    console.log("title :" + this.state.title);
    return
    <View style={styles.container}>
      <Header style={styles.header}>
        <Body>
          <Title>{this.state.title}</Title>
        </Body>
      </Header>
      <HomeBottomTab  setTitle={this.setTitle} style={styles.content} navigation = {this.props.navigation} />
    </View>
  }
  setTitle = (title) =>  {
    console.log("setTitle  " );
    this.setState({
      title:title
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header:{
    height:60,
    backgroundColor:'#3e9ce9',
    // androidStatusBarColor:'#3e9ce9',
  },
  content:{
    flex: 1
  }
});
