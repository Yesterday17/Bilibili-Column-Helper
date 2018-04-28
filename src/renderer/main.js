import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueCodemirror from 'vue-codemirror'

import App from './App'
import router from './router'
import store from './store'

/* Import css files here  */
import 'codemirror/lib/codemirror.css'
import 'element-ui/lib/theme-chalk/index.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueCodemirror)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
