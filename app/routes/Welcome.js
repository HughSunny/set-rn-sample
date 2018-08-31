import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    Button,
    AsyncStorage
} from 'react-native';
import Swiper from 'react-native-swiper';
import {NavigationActions, reset} from "../utils/NavigationUtil";
import Store from "react-native-simple-store";
import DeviceStorage from '../utils/DeviceStorage';


const { width, height } = Dimensions.get('window');//获取手机的宽和高
export default class Welcome extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {};
        this._handleBack = this._handleBack.bind(this);
    }

    //加载计时器
    componentDidMount(){
        this.timer=setTimeout(()=>{
            this._handleBack();
        },7000);//7秒后进入登录
    }

    //卸载计时器
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);//同时为真的才执行卸载
    }

    _handleBack(){
        // Store.save('isInit', 1);
        // Store.get('isInit').then(init => {
        //     console.log("initS = " + init);
        // })
        DeviceStorage.save('isInit', 1);
        var initD = DeviceStorage.get('isInit').then((inits) => {
                console.log("isInit inits= " + inits);
            });

        console.log("Init = " + initD);
        AsyncStorage.getItem("AAA").then((value) => {
            console.log(" AsyncStorage GET AAA = " + value);
        });
        if (global.isDva) {
            this.props.dispatch(NavigationActions.init({ routeName: 'Login' }));
        } else {
            reset(this.props.navigation, 'Login');
        }

    }

    render(){
        return (
            <View style={styles.container}>
                <Swiper showsButtons={true}       //为false时不显示控制按钮
                        paginationStyle={{      //小圆点位置
                            bottom: 70
                        }}
                        loop={false}        //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                        autoplay={true}          //自动轮播
                        autoplayTimeout={2}      //每隔2秒切换
                >
                    <Image style={styles.image} source={require('../resourses/imgs/splash.png')}/>
                    <Image style={styles.image} source={require('../resourses/imgs/icon_play.png')}/>
                    <View style={styles.imageContainer} >
                        <Image style={styles.actionImage} source={require('../resourses/imgs/screen.png')}/>
                        <Button title={'测试跳转'}
                                style={styles.btn }
                                onPress={this._handleBack}/>
                    </View>

                </Swiper>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image:{
        width,
        height:height
    },

    imageContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },

    actionImage:{
        width,
        height:height,
        position: 'absolute',
    },
    btn:{
        color:'#FF0000',
        position: 'absolute',
        alignSelf:'center',
        height: 100,

        right:0,
        marginBottom: "auto",
        marginTop:"auto",
        // left:0,
        // right: 0,
        // bottom: 0,
    }

});