const state = {
  passages: [],
  passage: {},
  count: 0
}

const mutations = {
  // For Editor
  SET_PASSAGE (state, payload) {
    state.passage = payload.passage
  },
  LOAD_PASSAGE (state, payload) {
    state.passage = state.passages.indexOf(payload)
  },

  // Passage Lib
  NEW_PASSAGE (state, payload) {
    state.passages.push({
      cid: state.count,
      ...payload
    })
    state.count++
  },
  DEL_PASSAGE (state, payload) {
    state.passages.splice(state.passages.indexOf(payload), 1)
  }
}

export default {
  state,
  mutations
}
