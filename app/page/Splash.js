import React, {Component} from 'react';
import { Dimensions, Animated, AsyncStorage } from 'react-native';
import Store from 'react-native-simple-store';
import SplashScreen from 'react-native-splash-screen';
import NavigationUtil from '../util/NavigationUtil';
import DeviceStorage from '../util/DeviceStorage';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../img/splash.png');

import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

/**
 * Created by Hugh on 2018/8/6
 */
export default class Splash extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(1)
        };
    }

    componentDidMount() {

        const { navigate } = this.props.navigation;
        Animated.timing(this.state.bounceValue, {
            toValue: 1.2,
            duration: 1000
        }).start();
        SplashScreen.hide();
        this.timer = setTimeout(() => {
            console.log("get Init start");
            console.log("Test JSON.stringify " + JSON.stringify(false));
            console.log("Test JSON.stringify " + JSON.stringify(1));
            var initd = DeviceStorage.get('isInit').then((inits) => {
                    console.log("isInit inits= " + inits);
                    if (!inits) {
                        NavigationUtil.reset(this.props.navigation, 'Welcome');
                    } else {
                        NavigationUtil.reset(this.props.navigation, 'Login');
                        //navigate('Login', { isFirst: true });
                    }
                }
            );
            console.log("isInit = " + initd);


            // Store.get('isInit').then(isInit => {
            //     console.log("isInit = " + isInit);
            //     if (!isInit) {
            //         NavigationUtil.reset(this.props.navigation, 'Welcome');
            //     } else {
            //         NavigationUtil.reset(this.props.navigation, 'Login');
            //         //navigate('Login', { isFirst: true });
            //     }
            // }).catch(error => {
            //     console.log(error)
            //     NavigationUtil.reset(this.props.navigation, 'Welcome');
            // });
            //navigate('Welcome', { isFirst: true });
            //navigate('LearnFlex', { isFirst: true });
        }, 2000);
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
                    transform: [{ scale: this.state.bounceValue }]
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