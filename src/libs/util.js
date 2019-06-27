import axios from 'axios';

let util = {

};

if (process.env.NODE_ENV === 'production') {

    if (process.env.VUE_APP_FLAG === 'pro') {
        //production 生产环境
        util.ajaxUrl = 'https://api.notarytrace.com/';
        console.log('pro 生产环境:' + util.ajaxUrl)
    } else {
        //test 测试环境
        util.ajaxUrl = 'https://apidev.notarytrace.com/';
        console.log('test 测试环境:' + util.ajaxUrl)
    }
} else {
    //dev 开发环境
    // util.ajaxUrl = 'http://192.168.40.202:8026/';
    util.ajaxUrl = 'http://192.168.40.202:62592/';
    console.log('dev 开发环境:' + util.ajaxUrl)
}


util.ajax = axios.create({
    baseURL: util.ajaxUrl,
    timeout: 30000,
    withCredentials: true,
    headers: {
    	'Accept': 'application/json',
    	'Content-Type': 'application/json;charset=UTF-8'
    }
});

export default util;