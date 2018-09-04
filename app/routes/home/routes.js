import React, {Component} from 'react';
import {
  createBottomTabNavigator,
  HeaderBackButton,
} from 'react-navigation';

import {BottomTabBar} from 'react-navigation-tabs';
import {
  BackHandler,
  Dimensions,
  Text
} from 'react-native'
import color from './color'
import Icon from 'react-native-vector-icons/Ionicons';
import page1Stack from './Page1Stack'
import page1 from './homepage1'
import page2 from './homepage2'
import page3 from './homepage3'



const navigationPagesConfig = {
  Page1: {
    screen: page1Stack,
    navigationOptions: {
      header:null,
      tabBarLabel: '首页',
      showLabel: true,
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
  },
  Page3: {
    screen: page3,
  },
};

const navigationPagesOptions = {

  navigationOptions: ({navigation}) => ({
    tabBarOnPress:() => { // 使用tabBarOnPress点击事件
      route(navigation);
      //this.props.setTitle(navigation.state.routeName);
    },
    headerLeft:null,
  }),

  //tabBarComponent: props => <TabBarComponent {...props}/>,
  //tabBarPosition: 'bottom',//显示位置

  //对于导航的设置
  tabBarOptions: {
    //android特有下划线的颜色1
    indicatorStyle: {height: 0},
    //文字的样式
    labelStyle: {
      fontSize: 10
    },
    //对于导航的styles
    style: {
      borderTopColor: '#ebebeb',
      borderTopWidth: 1,
      backgroundColor: 'white',
      height: Dimensions.get('window').height * 0.08,
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
  initialRouteParams: {title: 'Page1'}, // 找这条命令不容易, 翻github翻了一个小时\


  showIcon: true,//是否显示标签图标，默认为false。

  //pressOpacity:0.1,//按下标签的不透明度

  pressColor: '#ccc',//材质纹波的颜色（仅限Android> = 5.0）--按下的水印

  backBehavior: 'none',//按 back 键是否跳转到第一个Tab(首页)， none 为不跳转

}

const HomeBottomTab = createBottomTabNavigator(navigationPagesConfig, navigationPagesOptions);

//控制标题栏就是路由的名字
HomeBottomTab.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];
  console.log("navigationOptions routeName == " + routeName);
  return {
    headerTitle: routeName,
    headerTitleStyle:{flex: 1,textAlign: 'center'},
  }
};


export default HomeBottomTab;


/**
 * Tab点击跳转调用的公共方法
 */
const route = (navigation) => {
  if (!navigation.isFocused()) {
    // 路由方法, 动态跳转到对应界面
    console.log("route routeName == " + navigation.state.routeName);

    navigation.navigate(navigation.state.routeName, {
      title: navigation.state.routeName
    })
  }
};


const TabBarComponent = (props) => (<BottomTabBar onPress={onPress} {...props}/>)

const onPress = () => {
  console.log("BottomTabBar onPress")
};
