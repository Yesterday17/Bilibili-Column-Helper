import Store from 'electron-store'
import * as biliNetwork from '../../utils/biliNetwork'

let sync = new Store({
  name: 'sync'
})

const defaults = {
  category: [
    {
      id: 2,
      parent_id: 0,
      name: '动画',
      children: [
        {
          id: 4,
          parent_id: 2,
          name: '动漫杂谈'
        },
        {
          id: 5,
          parent_id: 2,
          name: '动漫资讯'
        },
        {
          id: 31,
          parent_id: 2,
          name: '动画技术'
        }
      ]
    },
    {
      id: 1,
      parent_id: 0,
      name: '游戏',
      children: [
        {
          id: 6,
          parent_id: 1,
          name: '单机游戏'
        },
        {
          id: 7,
          parent_id: 1,
          name: '电子竞技'
        },
        {
          id: 8,
          parent_id: 1,
          name: '手机游戏'
        },
        {
          id: 9,
          parent_id: 1,
          name: '网络游戏'
        },
        {
          id: 10,
          parent_id: 1,
          name: '桌游棋牌'
        }
      ]
    },
    {
      id: 28,
      parent_id: 0,
      name: '影视',
      children: [
        {
          id: 12,
          parent_id: 28,
          name: '电影'
        },
        {
          id: 35,
          parent_id: 28,
          name: '电视剧'
        },
        {
          id: 36,
          parent_id: 28,
          name: '纪录片'
        },
        {
          id: 37,
          parent_id: 28,
          name: '综艺'
        }
      ]
    },
    {
      id: 3,
      parent_id: 0,
      name: '生活',
      children: [
        {
          id: 13,
          parent_id: 3,
          name: '美食'
        },
        {
          id: 21,
          parent_id: 3,
          name: '萌宠'
        },
        {
          id: 14,
          parent_id: 3,
          name: '时尚'
        },
        {
          id: 22,
          parent_id: 3,
          name: '运动'
        },
        {
          id: 15,
          parent_id: 3,
          name: '日常'
        }
      ]
    },
    {
      id: 29,
      parent_id: 0,
      name: '兴趣',
      children: [
        {
          id: 23,
          parent_id: 29,
          name: '绘画'
        },
        {
          id: 24,
          parent_id: 29,
          name: '手工'
        },
        {
          id: 38,
          parent_id: 29,
          name: '摄影'
        },
        {
          id: 39,
          parent_id: 29,
          name: '音乐舞蹈'
        },
        {
          id: 11,
          parent_id: 29,
          name: '模型手办'
        }
      ]
    },
    {
      id: 16,
      parent_id: 0,
      name: '轻小说',
      children: [
        {
          id: 18,
          parent_id: 16,
          name: '原创连载'
        },
        {
          id: 19,
          parent_id: 16,
          name: '同人连载'
        },
        {
          id: 32,
          parent_id: 16,
          name: '短篇小说'
        },
        {
          id: 20,
          parent_id: 16,
          name: '小说杂谈'
        }
      ]
    },
    {
      id: 17,
      parent_id: 0,
      name: '科技',
      children: [
        {
          id: 25,
          parent_id: 17,
          name: '人文历史'
        },
        {
          id: 33,
          parent_id: 17,
          name: '自然'
        },
        {
          id: 26,
          parent_id: 17,
          name: '数码'
        },
        {
          id: 27,
          parent_id: 17,
          name: '汽车'
        },
        {
          id: 34,
          parent_id: 17,
          name: '学习'
        }
      ]
    }
  ]
}

const state = {
  category: [],
  categoryList: [],
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
  LOAD_SYNC_CONFIG (state) {
    state.category = sync.get('category', defaults.category)

    for (const c of state.category) {
      state.categoryMap.set(c.id, c.name)
      state.categoryList.push(c.id)

      for (const cd of c.children) {
        state.categoryMap.set(cd.id, cd.name)
      }
    }
  },
  SAVE_SYNC_CONFIG (state) {
    sync.set('category', state.category)
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
