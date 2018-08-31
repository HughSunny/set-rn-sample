/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { NavigationActions, StackNavigator} from 'react-navigation';

//重新设置navigation栈
//Reset方法会清除原来的路由记录，添加上新设置的路由信息, 可以指定多个action，index是指定默认显示的那个路由页面, 注意不要越界了
export const reset = (navigation, routeName) => {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName })]
    });
    navigation.dispatch(resetAction);
};

export { NavigationActions } from 'react-navigation'
// StackNavigator({
//     //Home界面route
//     Home:{
//         //require  screen就是一个react的组件(components)，用来展示的那个界面
//         screen:HomeScreen,
//         //optional   当深层次关联或者在web app中使用React Navigation,使用路径
//         path:'people/:username',
//         //optional Override navigationOptions方法，对navigator做一些配置
//         navigationOptions:{
//             //设置个标题
//             title:({state}) => `${state.params.username}'s Profile'`
//         },
//     }}
// );

