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

  static async get(key, defaultValue) {
    return
    AsyncStorage.getItem(key).then((value) => {
      console.log("DeviceStorage getItem : value : " + value);
      const jsonValue = JSON.parse(value);
      return jsonValue;
    }).catch(error => {
      console.log("DeviceStorage getItem : error : " + error.message);
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
