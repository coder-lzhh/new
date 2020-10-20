import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from 'network/index.js'

import toast from 'common/toast/index.js'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue
Vue.prototype.$api = api

Vue.use(VueLazyload, {
  loading: require('assets/img/common/placeholder.jpg'),//加载中图片，一定要有，不然会一直重复加载占位图
  error: require('assets/img/common/placeholder.jpg')  //加载失败图片
});
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
