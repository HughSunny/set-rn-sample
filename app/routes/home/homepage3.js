import React, {Component} from 'react';
import {
  StyleSheet,
  Text,

  View,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import AlertUtil from '../../utils/AlertUtil'
import px2dp from '../../utils/px2dp'
import TextButton from '../../components/TextButton'
import PropTypes from 'prop-types'
import ToastUtil from '../../utils/ToastUtil'
import Icon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import {NavigationActions} from "../../utils/NavigationUtil";

const TouchArea = (props) => {
  if (Platform.OS === 'android') {
    return <TouchableNativeFeedback
        delayPressIn={0}
        background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
        {...props}>
      {props.children}
    </TouchableNativeFeedback>;
  } else if (Platform.OS === 'ios') {
    return <TouchableOpacity {...props}>
      {props.children}
    </TouchableOpacity>;
  }
};
/**
 * Created by Hugh on 2018/8/16
 */
@connect()
export default class homepage3 extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    // headerTitle:'homepage3',
    headerTitle: navigation.state.params ? navigation.state.params.title : 'homepage3',
    tabBarLabel: '我的',
    tabBarIcon: ({tintColor, focused}) => (
        <Icon
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={26}
            style={{color: tintColor}}
        />
    ),
  });

  constructor(props) {
    super(props);
    this.state = {};
  }


  _onPressCallback(position) {
    switch (position) {
      case 0:
        AlertUtil.simpleAlert('Message', "This function currently isn't available");
        break;
      case 1:
        ToastUtil.showShort("ToastUtil This function currently isn't available", false)
        break;
      case 3:
        if (global.isDva) {
          this.props.dispatch(NavigationActions.navigate({routeName: 'LoginSuccess'}));
        }
        break;
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <ScrollView>
            <TouchArea onPress={this._onPressCallback.bind(this, 0)}>
              <View style={styles.intro}>
                <Image image={require('../../resourses/imgs/icon_play.png')} size={px2dp(50)}/>
                <View style={{marginLeft: px2dp(10)}}>
                  <Text style={{color: "#949494", fontSize: px2dp(20)}}>React_Native</Text>
                  <TextButton text="添加职位 @添加公司" color="#949494" fontSize={px2dp(13)}
                              onPress={this._onPressCallback.bind(this, 1)}/>
                </View>
              </View>
            </TouchArea>
            <View style={styles.list}>
              <Item icon="md-heart" text="我的收藏" subText="15篇" iconColor="#32cd32"
                    onPress={this._onPressCallback.bind(this, 2)}/>
            </View>
            <View style={styles.list}>
              <Item icon="md-heart" text="跳转测试"  iconColor="#32cd32"
                    onPress={this._onPressCallback.bind(this, 3)}/>
            </View>

          </ScrollView>
        </View>
    );
  }
}

class Item extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    text: PropTypes.string.isRequired,
    subText: PropTypes.string,
    onPress: PropTypes.func
  }

  static defaultProps = {
    iconColor: 'gray'
  }

  render() {
    const {icon, iconColor, text, subText, onPress} = this.props;
    return (
        <TouchArea onPress={onPress}>
          <View style={styles.listItem}>
            <Icon name={icon} size={px2dp(22)} color={iconColor}/>
            <Text style={{color: 'black', fontSize: px2dp(15), marginLeft: px2dp(20)}}>{text}</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text style={{color: "#ccc"}}>{subText}</Text>
            </View>
          </View>
        </TouchArea>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4'
  },
  intro: {
    height: px2dp(100),
    flexDirection: 'row',
    alignItems: 'center',
    padding: px2dp(20),
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#c4c4c4',
    borderTopColor: '#e4e4e4',
  },

  list: {
    marginTop: px2dp(15),
    borderTopWidth: 1 / PixelRatio.get(),
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#c4c4c4',
    borderTopColor: '#e4e4e4',
    flex: 1
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    height: px2dp(48)
  }

});
