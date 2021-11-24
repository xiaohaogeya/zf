import axios from 'axios';
//引入qs模块，用来序列化post类型的数据
import QS from 'qs';

//antd的message提示组件，大家可根据自己的ui组件更改。
// import { message } from 'antd'
import {Toast} from "antd-mobile";

//区分开发环境还是生产环境基础URL
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://8.136.214.28:8080' : 'http://127.0.0.1:8080'

// 请求拦截器
axios.interceptors.request.use(config => {
    // 开启loading
    Toast.loading('加载中...', 10, ()=> {
        Toast.fail('网络连接失败,请查看网络连接是否正确', 1, null, false)
    }, false)

    // 每次发送请求之前本地存储中是否存在token，也可以通过Redux这里只演示通过本地拿到token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = window.localStorage.getItem('userToken') || window.sessionStorage.getItem('userToken');
    //设置请求头
    config.headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': token
    }
    //序列化请求参数，不然post请求参数后台接收不正常
    config.data = QS.stringify(config.data)
    return config
}, error => {
    return Promise.reject(error);
})
//
// 响应拦截器
axios.interceptors.response.use(response => {
    // 关闭 loading
    Toast.hide()

    //根据返回不同的状态码做不同的事情
    // 这里一定要和后台开发人员协商好统一的错误状态码
    const {data, status} = response
    if (status) {
        switch (status) {
            case 200:
                return response;
            case 401:
                //未登录处理方法
                break;
            case 403:
                //token过期处理方法
                break;
            default:
                return response
                // message.error(response.data.msg)
        }
    } else {
        return response;
    }
}, error => Promise.reject(error))

export default axios
//最后把封装好的axios导出

