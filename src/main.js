import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
//加载vant组件库
import Vant from 'vant';
//加载vant组件库样式
import 'vant/lib/index.css';
//全局注册vant组件库
Vue.use(Vant);

//自动设置rem基准值(html标签字体大小)
import 'amfe-flexible'
//加载全局样式
import './styles/index.less'

import './utils/dayjs';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
