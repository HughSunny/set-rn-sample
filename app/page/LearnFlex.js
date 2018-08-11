import React, { Component } from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Dimensions,
    PixelRatio,
    TouchableOpacity
} from 'react-native';
export default class LearnFlex extends Component {
    render(){
        return (
            <View style={FlexStyles.container}>
                <View style={FlexStyles.vs1}/>
                <View style={FlexStyles.vs2}/>
                <View style={FlexStyles.vs1}/>
                <View style={FlexStyles.vs3}/>
                <View style={FlexStyles.vs1}/>
            </View>
        );
    }
}
const FlexStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-around',
        backgroundColor:'white'
    },
    vs1:{
        height:50,
        backgroundColor:'gray'
    },

    vs2:{
        flex:1,
        backgroundColor:'black'
    },

    vs3:{
        flex:2,
        backgroundColor:'black'
    }

});