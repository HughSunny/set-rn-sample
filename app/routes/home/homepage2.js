import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    RefreshControl,
    ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
/**
 * Created by Hugh on 2018/8/16
 */
@connect()
export default class homepage2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing:true,
        };
    }
    _onRefresh() {
        this.setState({refreshing: true});
        this._fetchData();
    }

    _fetchData() {

    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            tintColor="#110000"//IOS 指定刷新指示器的颜色
                            title="Loading..."//IOS string ：指定刷新指示器下显示的文字
                            titleColor="#001100"//IOS
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffffFF"/>
                    }>
                    <Text>显示数据</Text>
                </ScrollView>
                <Text>homepage2</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
