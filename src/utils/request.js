
//封装网络请求模块
 import store from '../store/index'
import axios from 'axios';
const request=axios.create({
  baseURL:'http://ttapi.research.itcast.cn/'   //基础路径
})


//请求拦截器
request.interceptors.request.use(function(config){
  const {user}=store.state
  if(user){
    config.headers.Authorization=`Bearer ${user.token}`
  }
  return config
},function(error){
  return Promise.reject(error)
    } );



//响应拦截器


//导出
export default request











