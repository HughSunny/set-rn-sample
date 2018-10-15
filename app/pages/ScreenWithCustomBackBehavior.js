import React from 'react';
import {
    BackHandler,ToastAndroid
} from 'react-native';

/**
 * 返回键监听
 */
class ScreenWithCustomBackBehavior extends React.Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);

    }
    // 另外一种写法
    // componentDidMount() {
    //     this.backHandler = BackHandler.addEventListener('hardwareBackPress',
    //         this.onBackButtonPressAndroid);
    // }
    //
    // componentWillUnmount() {
    //     this.backHandler&&this.backHandler.remove();
    // }

    onBackButtonPressAndroid = async() => {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。

            await this.saveData();
            BackHandler.exitApp();
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);

        return true;
    }

    saveData() {
        ToastAndroid.show('save Data', ToastAndroid.SHORT);
    }
}