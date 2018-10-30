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

import * as fs from 'fs'
import * as path from 'path'
import Store from 'electron-store'
import * as biliNetwork from '../../utils/biliNetwork'

let remoteStore = new Store({
  name: 'remote'
})

const state = {
  category: [],
  categoryMap: new Map(),

  count: {
    view: 0,
    reply: 0,
    like: 0,
    coin: 0,
    fav: 0,

    incr_view: 0,
    incr_reply: 0,
    incr_like: 0,
    incr_coin: 0,
    incr_fav: 0
  }
}

const mutations = {
  LOAD_REMOTE_CONFIG (state) {
    state.category = remoteStore.get(
      'category',
      JSON.parse(
        fs.readFileSync(path.join(__static, '/defaults/category.json'), 'utf-8')
      )
    )

    for (const c of state.category) {
      state.categoryMap.set(c.id, c)

      for (const cd of c.children) {
        state.categoryMap.set(cd.id, cd)
      }
    }
  },
  SAVE_REMOTE_CONFIG (state) {
    // TODO: Save as cache
  },
  UPDATE_USERINFO (state, result) {
    state.count.view = result['view']
    state.count.reply = result['reply']
    state.count.like = result['like']
    state.count.coin = result['coin']
    state.count.fav = result['fav']
    state.count.share = result['share']

    state.count.incr_view = result['incr_view']
    state.count.incr_reply = result['incr_reply']
    state.count.incr_like = result['incr_like']
    state.count.incr_coin = result['incr_coin']
    state.count.incr_fav = result['incr_fav']
    state.count.incr_share = result['incr_share']
  }
}

const actions = {
  SYNC_CONFIG ({ commit }, cookie) {
    // TODO: Sync category here.
    // state.category

    biliNetwork.getUserInfo(cookie).then(result => {
      if (result !== undefined) {
        commit('UPDATE_USERINFO', result)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
