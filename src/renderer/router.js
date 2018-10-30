/*
 * MIT License
 *
 * Copyright (c) 2018 Yesterday17
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/

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
