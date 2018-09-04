import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import px2dp from '../../utils/px2dp';
import theme from '../../resourses/theme';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';
import {connect} from 'react-redux';

/**
 * Created by Hugh on 2018/8/16
 */
@connect()
export default class homepage1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: this.props.navigation.state.routeName,
      tabNames: ['首页', 'Android', 'iOS']
    };
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    headerTitle:'homepage3',
  });


  render() {
    console.log("title :" + this.state.headerTitle);
    return (
        <View style={styles.container}>
          <Text style={styles.top}>homepage1</Text>

          <ScrollableTabView
              style={styles.scrollTab}
              renderTabBar={() => <DefaultTabBar style={styles.scrollTabBar}/>}
              tabBarBackgroundColor="rgb(22,131,251)"
              tabBarActiveTextColor="white"
              tabBarInactiveTextColor="rgba(255,255,255,0.5)"
              tabBarTextStyle={{fontSize: theme.scrollView.fontSize}}
              tabBarUnderlineStyle={theme.scrollView.underlineStyle}>
            <Text tabLabel={this.state.tabNames[0]} style={{marginBottom: px2dp(10)}}>currently there are no any
              messages</Text>

            <View tabLabel={this.state.tabNames[1]} style={styles.content}>
              <Text style={{marginBottom: px2dp(10)}}>currently there are no any messages</Text>
              <TouchableOpacity
                  // onPress={() => {
                  // }}
                  activeOpacity={theme.btnActiveOpacity}>
                <Text style={{color: theme.themeColor}}>登录 / Sign-in</Text>
              </TouchableOpacity>
            </View>

            <Text tabLabel={this.state.tabNames[2]} style={{marginBottom: px2dp(10)}}>currently there are no any
              messages,too</Text>

            {/*{this.state.tabNames.map((item, i) => {*/}
            {/*return(*/}
            {/*<HomeTab tabLabel={item} key={i} tabTag={item}/>*/}
            {/*);})*/}
            {/*}*/}
          </ScrollableTabView>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  },

  top: {
    flex: 1,
  },
  scrollTab: {
    marginTop: 40
  },
  scrollTabBar: {
    height: 40
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
