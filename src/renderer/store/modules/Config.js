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

import Store from 'electron-store'

let s = new Store({
  name: 'config'
})
const state = {
  version: '',

  renderer: '',
  poster: '',

  cookies: [],
  cookie: '',

  favoriteTags: []
}

const mutations = {
  LOAD_CONFIG (state) {
    state.renderer = s.get('renderer', 'default')
    state.poster = s.get('poster', 'default')

    state.cookies = s.get('cookies', [])
    state.cookie = s.get('cookie', '')

    state.favoriteTags = s.get('favoriteTags', [])
  },
  SAVE_CONFIG (state) {
    s.set(state)
  },
  UPDATE_COOKIES (state, cookies) {
    state.cookies = JSON.parse(JSON.stringify(cookies))
    state.cookie = cookies
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join(';')
  },
  UPDATE_COOKIE (state, cookie) {
    // Clear cookies
    state.cookies.splice(1, state.cookies.splice.length)
    state.cookie = cookie
    for (let item of cookie.match(/([^=; ]+=[^=; ]+)/g)) {
      let ans = /([^=]+)=([^=]+)/.exec(item)
      state.cookies.push({
        name: ans[1],
        value: ans[2]
      })
    }
  },
  RESET_COOKIES (state) {
    state.cookies.splice(0, state.cookies.length)
    state.cookie = ''
  }
}

export default {
  state,
  mutations
}
