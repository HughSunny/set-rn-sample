import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';

class NetUtil extends React.Component {
    /*
    *   在 ReactNative 中,使用 fetch 实现网络请求. fetch 同 XMLHttpRequest 非常类似,是一个封装程度更高的网络 API, 使用起来很简洁,因为使用了 Promise.
    *
    *   Promise 是异步编程的一种解决方案,比传统的解决方案 -- 回调函数事件 -- 更合理和更强大, ES6将其写进了语言标准,统一了用法,原生提供了 Promise 对象,简单说就是一个容器,里面保存着整个未来才会起结束的事件(通常是一个异步操作)的结果
    *
    *   Promise 对象代表一个异步操作,有三种状态: Pending(进行中), Resolved(已完成), Rejected(已失败).
    *
    *   Promise 实例生成之后,可以分别指定"完成"和"失败"状态的回调函数.实现方式:链式调用方法.
    *   fetch 中使用的就是该特性.
    *
    *   语法:
    *   fetch(参数)
    *   .then(完成的回调函数)
    *   .catch(失败的回调函数)
    *
    *   fetch(url, opts)
    *   .then((response) => {
    *       //网络请求成功执行改回调函数,得到响应对象,铜通过 response 可以获取请求的数据
    *       //例如: json,text 等等
    *
    *       return response.text();
    *       //return response.json();
    *   })
    *
    *   .then((resonseData) => {
    *       //处理请求得到的数据
    *
    *   })
    *   .catch((error) => {
    *       //网络请求失败执行该回调函数,得到错误信息
    *
    *   })
    *
    **/

    static postJson(url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            },
            body: data
        };

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                //  callback(JSON.parse(responseText));
                callback(responseText);
            }).done();
    }


    static getJson(url, params, callback) {
        var fetchOptions = {
            method: 'GET',

        };
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                //  callback(JSON.parse(responseText));
                callback(responseText);
            }).done();
    }

    static getUrlJson(url, callback) {
        var fetchOptions = {
            method: 'GET',

        };

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                //  callback(JSON.parse(responseText));
                callback(responseText);
            }).done();
    }


    //post请求
    /**
     *url :请求地址
     *data:参数
     *callback:回调函数
     */
    static postForm(url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'data=' + data + ''//这里我参数只有一个data,大家可以还有更多的参数
        };

        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText));
            }).done();
    }
}

export async function get(url) {
    const uri = encodeURI(url)
    return fetch(uri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(filterStatus).then(filterJSON)
}

export async function post(url, body) {
    const uri = encodeURI(url)
    return fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }).then(filterStatus).then(filterJSON)
}

function filterStatus(res) {
    if (res.status / 100 === 2) {
        return res
    }
    const error = new Error()
    error.res = res
    throw error
}

function filterJSON(res) {
    return res.json()
}

module.exports = NetUtil;