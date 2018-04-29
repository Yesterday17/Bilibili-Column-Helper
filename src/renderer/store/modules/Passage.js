const state = {
  passage: ''
}

const mutations = {
  SET_PASSAGE (state, payload) {
    state.passage = payload.passage
  }
}

export default {
  state,
  mutations
}
