import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'editor',
      component: require('@/components/Editor').default
    },
    {
      path: '/setting',
      name: 'setting',
      component: require('@/components/Setting').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
