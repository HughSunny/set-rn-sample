/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {Navigator} from 'react-native-deprecated-custom-components';
import TestMain from './page/TestMain';
//老版本的Navigator
export default class NavigatorEntry extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let defaultName = 'TestMain';
        let defaultComponent = TestMain;
        return (
            <Navigator
                initialRoute = {{name : defaultName , component: defaultComponent}}
                // configureScene = {(route) => {
                //     return Navigator.SceneConfigs.VerticalDownSwipeJump;
                // }}

                configureScene = {(route) => {
                    return ({
                        ...Navigator.SceneConfigs.PushFromRight,
                        gestures: null,
                    });
                }}
                renderScene={(route,navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator = {navigator} />
                }}
            />
        );
    }

    componentDidMount(){
        if(Platform.OS === 'android')
            SplashScreen.hide();
    }
};