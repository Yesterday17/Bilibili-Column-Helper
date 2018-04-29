import Store from 'electron-store'

let s = new Store({
  name: 'config'
})
const state = {
  config: {
    version: '',

    renderer: ''
  }
}

const mutations = {
  LOAD_CONFIG (state) {
    state.config.version = s.get('version', '1.0.0')
    state.config.renderer = s.get('renderer', 'marked')
    // state.xxx = s.get('')

    console.log(state)
  },
  SAVE_CONFIG (state) {
    s.set(state.config)
    s.openInEditor()
  }
}

export default {
  state,
  mutations
}
