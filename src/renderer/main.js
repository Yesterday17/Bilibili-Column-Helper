import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueCodemirror from 'vue-codemirror'
import directive from 'element-ui/packages/popover/src/directive'

/* eslint-disable no-unused-vars */
import App from './App'
import AppBootstrap from './AppBootstrap'
import router from './router'
import store from './store'

/* Import css files here  */
import 'element-ui/lib/theme-chalk/index.css'
import './css/font.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueCodemirror)
Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.directive('popover', directive)

/* eslint-disable no-new */
new Vue({
  components: { AppBootstrap },
  router,
  store,
  template: '<AppBootstrap/>'
}).$mount('#app')
