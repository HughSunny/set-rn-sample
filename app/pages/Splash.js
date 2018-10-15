import React, {Component} from 'react';
import {Dimensions, Animated, AsyncStorage} from 'react-native';
import Store from 'react-native-simple-store';
import SplashScreen from 'react-native-splash-screen';
import {reset, NavigationActions} from '../utils/NavigationUtil';
import DeviceStorage from '../utils/devicestorage';
import {connect} from 'react-redux';

import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../resourses/imgs/splash.png');


@connect(({app}) => ({...app}))
export default class Splash extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
    this.navigateNext = this.navigateNext.bind(this);
  }

  componentDidMount() {

    const {navigate} = this.props.navigation;
    Animated.timing(this.state.bounceValue, {
      toValue: 1.2,
      duration: 1000
    }).start();
    SplashScreen.hide();
    this.timer = setTimeout(() => {
      console.log("get Init start");
      console.log("get Init props isInit = " + this.props.isInit);
      if (this.props.isInit == -1) {
        AsyncStorage.getItem("isInit", (error, result) => {
          console.log("isInit isInit= " + result);
          this.navigateNext(result);
        })
      } else {
        this.navigateNext(this.props.isInit)
      }
    }, 1000);
  }

  navigateNext(isInit) {
    if (global.isDva) {
      if (!isInit) {
        this.props.dispatch(NavigationActions.navigate({routeName: 'Welcome'}));
      } else {
        // const resetAction = NavigationActions.init({
        //   index: 0,
        //   actions: [NavigationActions.navigate({routeName: 'Login'})]
        // });
        // this.props.dispatch(resetAction);
        this.props.dispatch(NavigationActions.navigate({routeName: 'Login'}));
      }
    } else {
      if (!isInit) {
        reset(this.props.navigation, 'Welcome');
      } else {
        reset(this.props.navigation, 'Login');
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
        <Animated.Image
            style={{
              width: maxWidth,
              height: maxHeight,
              transform: [{scale: this.state.bounceValue}]
            }}
            source={splashImg}
        />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
