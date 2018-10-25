import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueCodemirror from 'vue-codemirror'
import Octicon from 'vue-octicon/components/Octicon.vue'

// Extensions for bootstrap-vue
import colorfulButton from './components/colorful-button.vue'

import App from './App'
import router from './router'
import store from './store'

/* Import css files here  */
import './styles/custom.scss'
import 'vue-octicon/icons'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueCodemirror)
Vue.use(BootstrapVue)
Vue.component('octicon', Octicon)
Vue.component('colorful-button', colorfulButton)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
