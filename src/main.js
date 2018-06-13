import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import { ToastPlugin, ConfirmPlugin } from 'vux'

import './assets/iconfont/iconfont.css'
import './assets/less/common.less'
import tool from '@/assets/js/tool.js'

Vue.config.productionTip = false

Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(tool);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
