import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/passage',
      name: 'passage',
      component: require('@/components/Passage').default
    },
    {
      path: '/editor',
      name: 'editor',
      component: require('@/components/Editor').default
    },
    {
      path: '/setting',
      name: 'setting',
      component: require('@/components/Setting').default
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/components/About').default
    },
    {
      path: '*',
      redirect: '/editor'
    }
  ]
})
