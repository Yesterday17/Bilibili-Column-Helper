import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: require('@/components/welcome').default
    },
    {
      path: '/list',
      name: 'list',
      component: require('@/components/passage-list').default
    },
    {
      path: '/edit',
      name: 'edit',
      component: require('@/components/edit/').default
    },
    {
      path: '/options',
      name: 'options',
      component: require('@/components/options').default
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/components/about').default
    },
    {
      path: '*',
      redirect: '/welcome'
    }
  ]
})
