/**
 *
 */
'use strict';

import React, {Component} from 'react';
import {Text, View, StyleSheet, Platform, TouchableHighlight, TouchableNativeFeedback} from 'react-native';
//从React15.5起，React.PropTypes被移入到单独的package中
import { PropTypes} from 'prop-types';
import px2dp from '../utils/px2dp';
import theme from '../resourses/theme';

export default class Button extends Component{
    static propTypes = {
        text: PropTypes.string.isRequired,
        onPress: PropTypes.func
    };

    render(){
        if(Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback
                    onPress={this.props.onPress}>
                    {this._renderContent()}
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableHighlight
                    style={styles.btn}
                    onPress={this.props.onPress}
                    activeOpacity={theme.btnActiveOpacity}>
                    {this._renderContent()}
                </TouchableHighlight>
            );
        }
    }

    _renderContent(){
        return(
            <View style={{flex: 0, height: px2dp(45), backgroundColor: '#046ada',

                alignItems:'center', justifyContent:'center',
                borderRadius: 3}}
            >
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        flex: 0,
        height: px2dp(45)
    },
   text:{
       color: 'white',
       fontSize: px2dp(13)
   }
});