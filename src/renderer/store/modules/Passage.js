const state = {
  passages: [],
  passage: '',
  count: 0
}

const mutations = {
  SET_PASSAGE (state, payload) {
    state.passage = payload.passage
  },
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
