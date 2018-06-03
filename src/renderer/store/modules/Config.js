import Store from 'electron-store'

let s = new Store({
  name: 'config'
})
const state = {
  config: {
    version: '',

    renderer: '',

    cookies: [],
    cookie: '',

    favoriteTags: []
  }
}

const mutations = {
  LOAD_CONFIG (state) {
    // state.xxx = s.get('')
    state.config.version = s.get('version', '1.0.0')
    state.config.renderer = s.get('renderer', 'marked')

    state.config.cookies = s.get('cookies', [])
    state.config.cookie = s.get('cookie', '')

    state.config.favoriteTags = s.get('favoriteTags', [1, 2, 3])
  },
  SAVE_CONFIG (state) {
    s.set(state.config)
  },
  UPDATE_COOKIES (state, cookies) {
    state.config.cookies = cookies
    state.config.cookie = cookies
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join(';')
  },
  UPDATE_COOKIE (state, cookie) {
    state.config.cookie = cookie
  },
  RESET_COOKIES (state) {
    state.cookies = []
  }
}

export default {
  state,
  mutations
}
