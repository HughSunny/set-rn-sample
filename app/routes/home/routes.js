import React from 'react';
import {
    StackNavigator,
    TabBarBottom,
    TabNavigator,
} from 'react-navigation';
import {
    Dimensions,
} from 'react-native'
import color from './color'  //颜色样式
import Icon from 'react-native-vector-icons/Ionicons';
import page1 from './homepage1'
import page2 from './homepage2'
import page3 from './homepage3'

export default HomeBottomTab = TabNavigator({
        Page1: {
            screen: page1,
            navigationOptions: {
                tabBarLabel: '首页',
                showLabel: false,
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={focused ? 'ios-home' : 'ios-home-outline'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
            },
        Page2: {
            screen: page2,
            navigationOptions: {
                tabBarLabel: '信息',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={focused ? 'ios-paper' : 'ios-paper-outline'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
        page3: {
            screen: page3,
            navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name={focused ? 'ios-person' : 'ios-person-outline'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        },
    },
    {
        tabBarComponent:TabBarBottom,
        tabBarPosition:'bottom',//显示位置
        //对于导航的设置
        tabBarOptions: {
            //android特有下划线的颜色1
            indicatorStyle: {height: 0},
            //文字的样式
            labelStyle: {
                fontSize: 10
            },
            //对于导航的styles
            style :{
                borderTopColor:'#ebebeb',
                borderTopWidth:1,
                backgroundColor:'white',
                height:Dimensions.get('window').height*0.08,
            }
        },

        activeTintColor: color.primary,//活动选项卡的标签和图标颜色。
        inactiveTintColor: color.gray,//非活动选项卡的标签和图标颜色。
        //是否可以滑动切换
        swipeEnabled: false,
        //切换是否有动画
        animationEnabled: false,
        //进入App的首页面
        initialRouteName: 'Page1',

        showIcon:true,//是否显示标签图标，默认为false。

        //pressOpacity:0.1,//按下标签的不透明度

        pressColor:'#ccc',//材质纹波的颜色（仅限Android> = 5.0）--按下的水印

        backBehavior: 'none',//按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
        // tabBarOptions: {
        //     style: {
        //         height: 49,
        //         backgroundColor: 'white'
        //     },
        //     showLabel: false,
        // },

});


