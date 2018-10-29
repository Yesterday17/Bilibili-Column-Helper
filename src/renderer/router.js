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
      path: '/edit/:name?',
      name: 'edit',
      component: require('@/components/edit').default,
      children: [
        {
          path: 'preview',
          component: require('@/components/edit/preview').default
        },
        {
          path: 'editor',
          component: require('@/components/edit/editor').default
        },
        {
          path: 'double',
          component: require('@/components/edit/double-editor').default
        }
      ]
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
