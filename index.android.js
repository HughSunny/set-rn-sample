import React, { Component } from 'react';
import { AppRegistry, Platform} from 'react-native';
import Root from "./app/root";
// import TestMain from "./app/page/Splash";
// import LoginActivity from "./app/page/MainPage";
export default class WebStormProject extends Component {
    constructor (props) {
        super(props);
    }
    render() {
        return (
            <Root/>
        );
    }

}
AppRegistry.registerComponent('WebStormProject', () => WebStormProject);
