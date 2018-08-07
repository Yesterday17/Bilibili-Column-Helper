import Store from 'electron-store'

let s = new Store({
  name: 'config'
})
const state = {
  config: {
    version: '',

    renderer: '',
    poster: '',

    cookies: [],
    cookie: '',

    favoriteTags: []
  }
}

const mutations = {
  LOAD_CONFIG (state) {
    // state.xxx = s.get('')
    state.config.version = s.get('version', '1.0.0')
    state.config.renderer = s.get('renderer', 'biliZhuanlanMarkdownTool')
    state.config.poster = s.get('poster', 'default')

    state.config.cookies = s.get('cookies', [])
    state.config.cookie = s.get('cookie', '')

    state.config.favoriteTags = s.get('favoriteTags', [1, 2, 3])
  },
  SAVE_CONFIG (state) {
    s.set(state.config)
  },
  UPDATE_COOKIES (state, cookies) {
    state.config.cookies = JSON.parse(JSON.stringify(cookies))
    state.config.cookie = cookies
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join(';')
  },
  UPDATE_COOKIE (state, cookie) {
    // Clear cookies
    state.config.cookies.splice(1, state.config.cookies.splice.length)
    state.config.cookie = cookie
    for (let item of cookie.match(/([^=; ]+=[^=; ]+)/g)) {
      let ans = /([^=]+)=([^=]+)/.exec(item)
      state.config.cookies.push({
        name: ans[1],
        value: ans[2]
      })
    }
  },
  RESET_COOKIES (state) {
    state.config.cookies.splice(0, state.config.cookies.length)
    state.config.cookie = ''
  }
}

export default {
  state,
  mutations
}
