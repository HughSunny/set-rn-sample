import React, {
  AsyncStorage
} from 'react-native';

class DeviceStorage {

  // /**
  //  * 获取
  //  * @param key
  //  * @returns {Promise<T>|*|Promise.<TResult>}
  //  */
  // static async get(key) {
  //
  //   const value = await AsyncStorage.getItem(key);
  //   console.log("DeviceStorage getItem : value : " + value);
  //   return value;
  //
  // }

  static get(key, defaultValue) {
    return AsyncStorage.getItem(key).then((value) => {
      if (value !== null) {
        const jsonValue = JSON.parse(value);
        console.log("DS getItem : get  jsonValue : " + jsonValue);
      } else {
        console.log("DS getItem : get value  == null ");
      }
      var res = (value !== null ? JSON.parse(value) : defaultValue);
      return res;
    }).catch(error => {
      console.log("DS getItem : error : " + error.message);
    });
  }


  /**
   * 保存
   * @param key
   * @param value
   * @returns {*}
   */
  static save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value)).then(
        () => {   //成功的操作
          console.log(key + " : " + value + " > DeviceStorage save 成功!");
        },
    );
  }


  /**
   * 更新
   * @param key
   * @param value
   * @returns {Promise<T>|Promise.<TResult>}
   */
  static update(key, value) {
    return DeviceStorage.get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }


  /**
   * 更新
   * @param key
   * @returns {*}
   */
  static delete(key) {
    return AsyncStorage.removeItem(key).then(
        () => {   //成功的操作
          console.log(key + " > removeItem 成功!");
        });
  }
}

export default DeviceStorage;
