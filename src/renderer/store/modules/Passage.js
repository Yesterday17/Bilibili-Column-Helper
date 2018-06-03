import Store from 'electron-store'

let store = new Store({
  name: 'column'
})

const state = {
  passages: [],
  passage: {
    text: ''
  },
  count: 0
}

const mutations = {
  // For Editor
  SET_PASSAGE (state, payload) {
    state.passage = payload.passage
  },
  SET_TITLE (state, title) {
    state.passage.name = title
  },
  SET_COVER (state, cover) {
    state.passage.cover = cover
  },
  SET_CONTENT (state, content) {
    state.passage.text = content
  },
  LOAD_PASSAGE (state, payload) {
    state.passage = state.passages.indexOf(payload)
  },

  // Passage Library
  NEW_PASSAGE (state, payload) {
    state.passages.push({
      cid: state.count,
      ...JSON.parse(JSON.stringify(payload))
    })
    state.count++
  },
  DEL_PASSAGE (state, payload) {
    state.passages.splice(state.passages.indexOf(payload), 1)
  },

  // Save / Load Passage
  SAVE_PASSAGES (state) {
    store.set(state)
  },
  LOAD_PASSAGES (state) {
    state.passages = store.get('passages', [])
    state.passage = store.get('passage', {text: ''})
    state.count = store.get('count', 0)
  }
}

export default {
  state,
  mutations
}
