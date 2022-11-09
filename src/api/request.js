import axios from 'axios'
import npropress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
//引入axios
const requests = axios.create({
    baseURL:"/api",//基础路径
    timeout:5000//请求超时时间

})
//创建axios实例对象
//请求拦截器
requests.interceptors.request.use((config)=>{
    //config中拥有请求头
    npropress.start()
    //进度条开始动
    if(store.state.detail.userId){
        config.headers.userTempId = store.state.detail.userId
    }
    //添加token令牌
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    return config
})
//响应拦截器
requests.interceptors.response.use(
    res=>{
        npropress.done()
        return res.data
    },error=>{
        //终止promise链
        return Promise.reject(new Error('file'))
})
export default requests