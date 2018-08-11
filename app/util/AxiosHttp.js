import axios from 'axios'
import qs from 'qs';
axios.defaults.baseURL = 'http://192.168.2.102:8080';
//配置允许跨域携带cookie
axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;
// // axios拦截器
axios.interceptors.request.use(config => {
    config.headers = {

    };
    // 在这里设置请求头与携带token信息
    // config.headers['Authorization'] = "12233334"
    // config.headers['token'] = "rreebjjj"
    // if(config.method === 'get'){
    //     config.params = {
    //         ...config.data,
    //         _t: Date.parse(new Date())/1000
    //     }
    // config.setHeaders(
    //    //不能用
    // )

    return config
})

axios.interceptors.response.use(response => {
    // 在这里你可以判断后台返回数据携带的请求码
    if (response.status === 200 || response.status === '200') {
        return response.data.data || response.data
    } else {
        // 非200请求抱错
        throw Error(response.data.msg || '服务异常')
    }
});
// export default axios;

// fetch感觉略麻烦，不清爽，直接引了个axios，用es7写的。
export default class http {
    static async get(url, params) {
        /**
         * params{
         * goods：id，
         * name：string
         * } ==> ?goods=id&name=string
         */
        try {
            let query = await qs.stringify(params)
            let res = null;
            if (!params) {
                res = await axios.get(url)
            } else {
                res = await axios.get(url + '?' + query)
            }
            console.log(res);
            return res;
        } catch (error) {
            return error
        }
    }

    static async post(url, params) {
        try {
            let res = await axios.post(url, params)
            return res
        } catch (error) {
            return error
        }
    }

    static async patch(url, params) {
        try {
            let res = await axios.patch(url, params)
            return res
        } catch (error) {
            return error
        }
    }

    static async put(url, params) {
        try {
            let res = await axios.put(url, params)
            return res
        } catch (error) {
            return error
        }
    }

    static async delete(url, params) {
        /**
         * params默认为数组
         */
        try {
            let res = await axios.post(url, params)
            return res
        } catch (error) {
            return error
        }
    }
}