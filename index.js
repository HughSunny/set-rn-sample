import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import LoginActivity from "./app/page/test/LoginViewTest";
export default class WebStormProject extends Component {
    render() {
        return (
            <LoginActivity/>
        );
    }
}
AppRegistry.registerComponent('WebStormProject', () => WebStormProject);
