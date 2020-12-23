//初始化dayjs相关配置
import Vue from 'vue'
import dayjs from 'dayjs'

//配置使用中文语言包
import 'dayjs/locale/zh-cn'


import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

// dayjs().format('YYYY-MM-DD HH-mm-ss')

//把处理相对时间的代码包装为全局过滤器,然后就可以在任何组件的模板中使用
//所谓的过滤器其实就是一个可以在模板中调用的函数而已
Vue.filter('relativeTime',value=>{
  return dayjs(value).from(dayjs())
})







