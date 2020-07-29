import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import 'ant-design-vue/dist/antd.css'
import {Layout, Affix, Input, Button, Spin} from 'ant-design-vue'
Vue.use(Layout)
Vue.use(Affix)
Vue.use(Input)
Vue.use(Button)
Vue.use(Spin)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
