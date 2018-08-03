import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueCodemirror from 'vue-codemirror'
import AsyncComputed from 'vue-async-computed'
import directive from 'element-ui/packages/popover/src/directive'

import App from './App'
import router from './router'
import store from './store'

/* Import css files here  */
import 'element-ui/lib/theme-chalk/index.css'
import './css/font.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueCodemirror)
Vue.use(AsyncComputed)
Vue.use(ElementUI)
Vue.directive('popover', directive)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
